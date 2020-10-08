# Gatsby WordPress

Based on Zac Gordon's course [Headless WordPress with Gatsby](https://javascriptforwp.com/courses/headless-wordpress-with-gatsby)

## Local development

```bash
npm install && npm run dev
```

## To use your own WordPress instance

1. In your WP instance, install and activate the `master` branch of [wp-graphql](https://github.com/wp-graphql/wp-graphql) and [wp-graphiql](https://github.com/wp-graphql/wp-graphiql)
1. Change the URL to your WP instance:
```diff
diff --git a/gatsby-config.js b/gatsby-config.js
index 9bcc86d..d6c75c4 100644
--- a/gatsby-config.js
+++ b/gatsby-config.js
@@ -11,7 +11,7 @@ module.exports = {
       options: {
         typeName: `WPGraphql`,
         fieldName: `wpgraphql`,
-        url: `https://kienstra.wpengine.com/graphql`,
+        url: `https://your-wordpress-instance.com/graphql`,
       },
     },
```
1. `npm install && npm run dev`
