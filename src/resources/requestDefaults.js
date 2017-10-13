function requestDefaults(host, token) {
  return {
    strictSSL: false,
    resolveWithFullResponse: true,
    baseUrl: host,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
}

export default requestDefaults;
