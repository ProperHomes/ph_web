## Backend Code is at: https://github.com/properhomes/ph_server

## Deployment
- We're using sst to deploy the site on AWS rather than vercel which has absurd plans and pricing. 
- Even better than SST is to just have something like coolify and get done with it. But we're going with SST for now.
- For more info on SST visit sst.dev to check the docs in detail.

## Add a new .env file and add env variables as specified in .env-sample file

## Add sst config secrets.
  - We need to add secrets using the `npx sst secrets` command.
  - First, check the sst-cofig.ts file and check lines 13 to 28.
  - For eg: in this line -> `const REVALIDATION_SECRET_KEY = new Config.Secret(stack,"REVALIDATION_SECRET_KEY");`, 
    REVALIDATION_SECRET_KEY is the name of the secret we need to set.
  - We can set the secret using `npx sst secret set REVALIDATION_SECRET_KEY SECRET_VALUE_HERE --stage=staging_or_prod_whatever_is_your_stage_name`
  - whenever you set a new Secret using npx sst secrets locally, first bind in sst config then run npx sst   
    dev before running yarn dev. Otherwise the secret wont bind to the function locally.
  - In case of prod deployment => first bind them in sst config and deploy without using them in the code. Only after deploy, we can use them in the code.
