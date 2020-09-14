require("dotenv").config({
  path: `.env.GATSBY_CONCURRENT_DOWNLOAD`,
})

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: process.env.WPGRAPHQL_URL || `http://cumulations.local/graphql`,
        verbose: true,
        develop: {
          hardCacheMediaFiles: true,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
          },
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                  50
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          },
        },
      },
    },
    `gatsby-plugin-chakra-ui`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/, // See below to configure properly
        },
      },
    },
    `gatsby-plugin-netlify-cache`,
    {
      resolve: "@pasdo501/gatsby-source-woocommerce",
      options: {
        // Base URL of Wordpress site
        api: "cumulations.local",

        // set to false to not see verbose output during build
        // default: true
        verbose: true,

        // true if using https. otherwise false.
        https: true,
        api_keys: {
          consumer_key: 'asra2528',
          consumer_secret: 'qwerty1234%',
        },
        // Array of strings with fields you'd like to create nodes for...
        fields: ["products", "products/categories", "products/attributes"],
        // Send the API keys as query string parameters instead of using the authorization header
        // OPTIONAL: defaults to false
        query_string_auth: false,
        // Version of the woocommerce API to use
        // OPTIONAL: defaults to 'wc/v3'
        api_version: "wc/v2",
        // OPTIONAL: How many results to retrieve *per request*
        per_page: 100,
        // OPTIONAL: Custom WP REST API url prefix, only needed if not using
        // the default wp-json prefix.
        wpAPIPrefix: "wp-json",
        // OPTIONAL: Support for URLs with ports, e.g. 8080; defaults to no port
        port: "8080",
        // OPTIONAL: Encoding; default to 'utf8'
        encoding: "utf8",
        // OPTIONAL: Custom Axios config (see https://github.com/axios/axios) - note that this can override other options.
        axios_config: {
          // Axios config options
        },
      },
    },
  ],
}
