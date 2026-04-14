import { defineConfig } from 'jsrepo';

export default defineConfig({
  // configure where stuff comes from here
  registries: [],
  // configure where stuff goes here
  /**
   * To install to a specific location, add the path to the component here. For example:
   * paths: {
   *  component: './src/components/react-bits/lightRays/'
   * },
   */
  paths: {
    component: ''
  },
});
