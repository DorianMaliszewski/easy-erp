const routes = {
  LOGIN: { path: "/login", title: "Connexion" },
  DASHBOARD: { path: "/dashboard", title: "Tableau de bord" },
  MY_PROFILE: { path: "/my-profile", title: "Mon profil" },
  MY_AGENDA: { path: "/my-agenda", title: "Mon agenda" },
  EVENTS_DETAIL: { path: "/event", title: "Détail évènement" },
  MY_CUSTOMERS: { path: "/my-customers", title: "Mes clients" },
  CUSTOMERS_DETAIL: { path: "/customers/detail/:id", title: "Détail client" },
  CUSTOMERS_ADD: { path: "/customers/form", title: "Ajouter un client" },
  CUSTOMERS_UPDATE: { path: "/customers/form/:id", title: "Modifier un client" },
  CUSTOMER_USER_DETAIL: { path: "/customers/users/:id", title: "Détail utilisateur client" },
  CUSTOMER_USER: { path: "/customers/users", title: "Liste des utilisateur d'un client" },
  MY_QUOTES: { path: "/my-quotes", title: "Mes devis" },
  QUOTES_DETAIL: { path: "/quotes/detail/:id", title: "Détail devis" },
  QUOTES_FORM: { path: "/quotes/form", title: "Formulaire devis" },
  MY_BILLS: { path: "/my-bills", title: "Mes factures" },
  BILLS_DETAIL: { path: "/bills/detail/:id", title: "Détail facture" },
  BILLS_FORM: { path: "/bills/form", title: "Formulaire facture" },
  USER_DETAIL: { path: "/users/:id", title: "Détail d'un utilisateur" },
  ADMIN_TENANT: { path: "/admin/tenant/details", title: "Administration de mon entreprise" },
  ADMIN_TENANT_FORM: { path: "/admin/tenant/form", title: "Administration de mon entreprise" },
  ADMIN_USERS: { path: "/admin/users", title: "Administration des utilisateurs internes" },
  ADMIN_CLIENTS_USERS: { path: "/admin/clients-users", title: "Administration des utilisateurs client" },
  ADMIN_CLIENTS: { path: "/admin/clients", title: "Administration des clients" }
};

export default routes;
