# havana-apollo-plugin

This plugin provides custom Apollo3 components for Havana.
- Biotypes Component: Dropdown with ensembl biotypes
- Havana Save Component: Save button which syncs data from Apollo3 to Havana

### Development

To develop against JBrowse Web and Apollo3:

- Start a development version of JBrowse Web (see
  [here](https://github.com/GMOD/jbrowse-components/blob/master/CONTRIBUTING.md))
- Start a development version of Apollo3
- In this project, run `yarn start` (or `npm run start`)
- Add the following to your Apollo3 config:

```javascript
  plugins: [
    {
        name: 'HavanaApolloPlugin',
        url: 'http://localhost:9001/dist/havana-apollo-plugin.umd.development.js'
    }
  ],
```
- When you make changes to your plugin, it will automatically be re-built. You
  can then refresh JBrowse Web to see the changes.

### Publishing to NPM

Once you have developed your plugin, you can publish it to NPM. Remember to
remove `"private": true` from `package.json` before doing so.
