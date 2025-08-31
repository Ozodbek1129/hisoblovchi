import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'malumotlar' })
export class Malumot extends Model<Malumot> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  tartibRaqami: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  sana: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  telNomer: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  davlatRaqami: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  gazlashgan: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ruxsatnoma: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  texasmotr: Date;

  @Column({
    type: DataType.DECIMAL,
    defaultValue: 0,
  })
  davlatTolovi: number;

  @Column({
    type: DataType.DECIMAL,
    defaultValue: 0,
  })
  smart: number;

  @Column({
    type: DataType.DECIMAL,
    defaultValue: 0,
  })
  umumiySumma: number;
}
