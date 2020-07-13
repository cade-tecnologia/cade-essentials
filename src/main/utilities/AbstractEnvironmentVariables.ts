import Assert from '../asserts/Assert';
import HttpStatus from '../types/HttpStatus';

export default abstract class AbstractEnvironmentVariables {
  protected constructor(protected readonly prefix: string) {
  }

  protected getVariable(name: string, withPrefix: boolean = true): string {
    const envName = withPrefix
      ? `${this.prefix}_${name}`
      : `${name}`;

    const env = process.env[envName];

    Assert.notBlank(env, {
      errorMessage: `Environment Variable [${envName}] Not Found`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
    });

    return env as string;
  }
}
