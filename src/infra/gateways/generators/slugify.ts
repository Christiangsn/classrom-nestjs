import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { IGenerationSlug } from './slugify.contract';

@Injectable()
export class SlugGenerator implements IGenerationSlug {
  public generation(name: string): string {
    return slugify(name, { lower: true });
  }
}
