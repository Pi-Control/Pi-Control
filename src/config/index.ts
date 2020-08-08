import fs from 'fs';
import path from 'path';

import DefaultConfig from './default_config.json';

interface Configuration {
  authentication?: {
    salt?: string;
  };
}

let loadedConfig: Configuration;

const possibleConfigFiles = [''];
const configFileName = 'piconf.json';

function LoadConfiguration(): Promise<void> {
  return new Promise((resolve, reject) => {
    for (const possiblePath in possibleConfigFiles) {
      try {
        const config = fs.readFileSync(
          path.join(possiblePath, configFileName),
          'utf-8',
        );
        loadedConfig = JSON.parse(config);
        resolve();
        return;
      } catch (e) {
        continue;
      }
    }
    reject('No configuration file specified!');
  });
}

function getSalt(): string {
  return (
    loadedConfig?.authentication?.salt ||
    DefaultConfig.authentication.salt ||
    ''
  );
}

export default {
  LoadConfiguration,
  getSalt,
};
