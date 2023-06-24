declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const vueComponent: DefineComponent<{}, {}, any>;

  export default vueComponent;
}
interface Window {
  $message: import("naive-ui").MessageProviderInst;
}
