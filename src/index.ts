import Plugin from '@jbrowse/core/Plugin'
import PluginManager from '@jbrowse/core/PluginManager'
import { version } from '../package.json'

import { BiotypesComponent } from './BiotypesComponent'
import { HavanaSaveComponent } from './HavanaSaveComponent'

export default class HavanaApolloPlugin extends Plugin {
  name = 'HavanaApolloPlugin'
  version = version

  install(pluginManager: PluginManager) {
    pluginManager.addToExtensionPoint(
      'Apollo-BiotypesComponent',
      (arg: React.ElementType, props) => {
        if (props.key === 'status') {
          return BiotypesComponent
        }
        return arg
      },
    )

    pluginManager.addToExtensionPoint(
      'Apollo-HavanaSaveComponent',
      (arg: React.ElementType, props) => {
        if (props.key === 'status') {
          return HavanaSaveComponent
        }
        return arg
      },
    )
  }
}
