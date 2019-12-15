package com.easyerp.quoteservice.utils;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class SecurityUtils {

    /**
     * Check if in the authorities there are a role more than manager or equal manager
     * @param authorities Collection of
     * @return
     */
    public static Boolean isMoreThanOrEqualManager(Collection<? extends GrantedAuthority> authorities) {
        return authorities.stream().anyMatch(grantedAuthority ->
                grantedAuthority.getAuthority().equalsIgnoreCase("ROLE_SUPER_ADMIN") ||
                grantedAuthority.getAuthority().equalsIgnoreCase("ROLE_ADMIN") ||
                grantedAuthority.getAuthority().equalsIgnoreCase("ROLE_MANAGER"));
    }
}
