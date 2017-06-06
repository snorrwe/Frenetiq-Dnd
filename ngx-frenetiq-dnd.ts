import { NgModule, ModuleWithProviders } from "@angular/core";

@NgModule({
  declarations: [
  ],
  providers: [
  ],
  exports: [
  ]
})
export class FrenetiqDnd {

  /* optional: in case you need users to override your providers */
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: FrenetiqDnd,
      providers: configuredProviders
    };
  }
}
