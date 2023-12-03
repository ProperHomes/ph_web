# whenever you set a new Secret using npx sst secrets, 
 - local => bind in sst config, run npx sst dev before running yarn dev. Otherwise the secret wont bind to the function locally.
 - prod => first bind them in sst config and deploy without using them. Only after deploy, we can use them
