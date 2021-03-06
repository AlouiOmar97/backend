// Default configuration values:
export default {
  eureka: {
    heartbeatInterval: 30000,
    registryFetchInterval: 30000,
    fetchRegistry: true,
    filterUpInstances: true,
    servicePath: '/eureka/',
    ssl: false,
    useDns: false,
    fetchMetadata: true,
    useLocalMetadata: false,
  },
  instance: {},
};
