# Gatsby WordPress

Based on Zac Gordon's course [Headless WordPress with Gatsby](https://javascriptforwp.com/courses/headless-wordpress-with-gatsby).

This is from following Zac's videos, so most of the code is Zac's.

## Local development

```bash
npm install && npm run dev
```

## To use your own WordPress instance

1. In your WP instance, install and activate the `master` branch of [wp-graphql](https://github.com/wp-graphql/wp-graphql) and [wp-graphiql](https://github.com/wp-graphql/wp-graphiql)
2. Change the URL to your WP instance:
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
diff --git a/config.js b/config.js
index 8a8d168..158d20d 100644
--- a/config.js
+++ b/config.js
@@ -1,5 +1,5 @@
 const config = {
-    wordPressUrl: `https://kienstra.wpengine.com`,
+    wordPressUrl: `https://your-wordpress-instance.com`,
 }
```
3. `npm install && npm run dev`
