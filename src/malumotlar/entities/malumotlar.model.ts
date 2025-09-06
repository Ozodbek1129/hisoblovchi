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
    get() {
      const rawValue = this.getDataValue('sana');
      return rawValue ? rawValue.toISOString().split('T')[0] : null;
    },
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

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  gazlashgan: number;
  

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  ruxsatnoma: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  texasmotr?: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  davlatTolovi: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  smart: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  umumiySumma: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  gazakt: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  gazaktTrip: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  sugurta: number;
}
