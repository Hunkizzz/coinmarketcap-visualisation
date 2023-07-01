const prod = {
  url: {
    KEYCLOAK_BASE_URL: "https://localhost:8081",
    API_BASE_URL: 'http://localhost:8095'
  }
}

const dev = {
  url: {
    KEYCLOAK_BASE_URL: "https://localhost:8081",
    API_BASE_URL: 'http://localhost:8095'
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod