interface RouterConfig {
  USER: {
    HOME: string;
    PROFILE: string;
    PRODUCT: string;
    LOGIN: string;
    TICKET_SEARCH: string;
    INTRODUCE: string;
    CONTACT: string;
    SCHEDULE: string;
    BOOK_TICKET: string;
    TICKET_HISTORY: string;
    PAYMENT: string;
    ACCOUNT_INFO: string;
    ADDRESS: string;
    RESET_PASSWORD: string;
    GUIDE: string;
    NEWS: string;
  };
  ADMIN: {
    HOMEADMIN: string;
    ADDTRIP: string;
    MANAGETRIPS: string;
    MANAGEUSERS: string;
    STATISTICS: string;
  };
}

export const ROUTER: RouterConfig = {
  USER: {
    HOME: "home",
    PROFILE: "profile",
    PRODUCT: "product",
    LOGIN: "login",
    TICKET_SEARCH: "ticket-search",
    INTRODUCE: "introduce",
    CONTACT: "contact",
    SCHEDULE: "schedule",
    BOOK_TICKET: "book-ticket",
    TICKET_HISTORY: "ticket-history",
    PAYMENT: "payment",
    ACCOUNT_INFO: "account-info",
    ADDRESS: "address",
    RESET_PASSWORD: "reset-password",
    GUIDE: "guide",
    NEWS: "news",
  },
  ADMIN: {
    HOMEADMIN: "admin",
    ADDTRIP: "/admin/add-trip",
    MANAGETRIPS: "/admin/manage-trips",
    MANAGEUSERS: "/admin/manage-users",
    STATISTICS: "/admin/statistics",
  },
}; 