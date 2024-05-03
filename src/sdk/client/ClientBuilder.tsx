export const createAnonymousClient = (): Client => {
  const anonymousAuthOptions: AnonymousAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      anonymousId: crypto.randomUUID(),
    },
    scopes: [`manage_project:${projectKey}`],
    fetch,
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(anonymousAuthOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};
export const getAnonymousApiRoot = () => {
  return createApiBuilderFromCtpClient(createAnonymousClient()).withProjectKey({projectKey})
}
