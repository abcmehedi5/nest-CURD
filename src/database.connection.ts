import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseConnection {
  constructor(private readonly connection: Connection) {}
}
