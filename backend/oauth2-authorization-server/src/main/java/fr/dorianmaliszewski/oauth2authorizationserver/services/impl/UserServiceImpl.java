package fr.dorianmaliszewski.oauth2authorizationserver.services.impl;

import fr.dorianmaliszewski.oauth2authorizationserver.domains.User;
import fr.dorianmaliszewski.oauth2authorizationserver.enums.RoleEnum;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.RoleRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.repositories.UserRepository;
import fr.dorianmaliszewski.oauth2authorizationserver.requests.UserRequest;
import fr.dorianmaliszewski.oauth2authorizationserver.services.EmailService;
import fr.dorianmaliszewski.oauth2authorizationserver.services.UserService;
import fr.dorianmaliszewski.oauth2authorizationserver.utils.PasswordUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final EmailService emailService;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
            RoleRepository roleRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.emailService = emailService;
    }

    @Override
    public User createCustomerUser(UserRequest userRequest, OAuth2Authentication authentication) {
        User createdBy = this.userRepository.findByUsername(authentication.getName()).orElseThrow();
        User user = new User();
        user.setUsername(userRequest.getUsername());
        user = this.userRepository.saveAndFlush(user);
        this.feedUserWithUserRequest(user, userRequest);
        user.setRole(this.roleRepository.findByName(RoleEnum.ROLE_CLIENT));

        user.setTenant(createdBy.getTenant());

        return this.userRepository.save(user);
    }

    @Override
    public User createInternalUser(UserRequest userRequest, OAuth2Authentication authentication) {
        User createdBy = this.userRepository.findByUsername(authentication.getName()).orElseThrow();
        User user = new User();
        user.setUsername(userRequest.getUsername());
        user = this.userRepository.saveAndFlush(user);

        this.feedUserWithUserRequest(user, userRequest);

        if (!Objects.equals(userRequest.getRoleId(),
                this.roleRepository.findByName(RoleEnum.ROLE_SUPER_ADMIN).getId())) {
            user.setRole(this.roleRepository.findById(userRequest.getRoleId()).orElseThrow());
        } else {
            user.setRole(this.roleRepository.findByName(RoleEnum.ROLE_USER));
        }

        user.setTenant(createdBy.getTenant());

        return this.userRepository.save(user);
    }

    @Override
    public User updateInternalUser(Long id, UserRequest userRequest, OAuth2Authentication authentication) {
        User user = this.userRepository.findById(id).orElseThrow();
        this.feedUserWithUserRequest(user, userRequest);

        if (!Objects.equals(userRequest.getRoleId(),
                this.roleRepository.findByName(RoleEnum.ROLE_SUPER_ADMIN).getId())) {
            user.setRole(this.roleRepository.findById(userRequest.getRoleId()).orElseThrow());
        } else {
            user.setRole(this.roleRepository.findByName(RoleEnum.ROLE_USER));
        }

        return this.userRepository.save(user);

    }

    @Override
    public User updateCustomerUser(Long id, UserRequest userRequest, OAuth2Authentication authentication) {
        User user = this.userRepository.findById(id).orElseThrow();
        this.feedUserWithUserRequest(user, userRequest);

        return this.userRepository.save(user);

    }

    private void feedUserWithUserRequest(User user, UserRequest userRequest) {
        user.setAccountExpired(false);
        user.setAccountLocked(false);
        user.setCredentialsExpired(false);
        user.setEnabled(true);

        user.setClientId(userRequest.getClientId());
        user.setEmail(userRequest.getEmail());
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setPhoneNumber(userRequest.getPhoneNumber());

        if (userRequest.getPassword() != null) {
            user.setPassword(this.passwordEncoder.encode(userRequest.getPassword()));
        }

        if (userRequest.getSendPasswordByEmail()) {
            String password = PasswordUtils.generatePassayPassword();
            user.setPassword(passwordEncoder.encode(password));
            this.sendPasswordByEmail(user, password);
        }

    }

    @Override
    public User findByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = this.userRepository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            throw new BadCredentialsException("Bad credentials");
        }

        new AccountStatusUserDetailsChecker().check(optionalUser.get());

        return optionalUser.get();
    }

    private void sendPasswordByEmail(User user, String password) {
        System.out.println("Envoi du mot de passe " + password + " à l'utilisateur " + user.getUsername() + " email : "
                + user.getEmail());
        this.emailService.sendSimpleMessage(user.getEmail(), "Votre inscription sur EASY-ERP ",
                "Bienvenue sur EASY-ERP : username :" + user.getUsername() + ", password : " + password);
    }
}
