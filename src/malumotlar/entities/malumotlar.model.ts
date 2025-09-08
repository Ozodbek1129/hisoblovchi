import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface MalumotAttributes {
  tartibRaqami: number;
  sana: Date | null;
  fullName: string;
  telNomer: string;
  davlatRaqami: string;
  gazlashgan: number;
  ruxsatnoma: number | null;
  texasmotr: number | null;
  davlatTolovi: number;
  smart: number;
  umumiySumma: number;
  gazakt: number;
  gazaktTrip: number;
  sugurta: number;
}

interface MalumotCreationAttributes
  extends Omit<MalumotAttributes, 'tartibRaqami'> {}

@Table({ tableName: 'malumotlar' })
export class Malumot
  extends Model<MalumotAttributes, MalumotCreationAttributes>
  implements MalumotAttributes
{
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  tartibRaqami!: number;

  @Column({
    type: DataType.DATE,
    get() {
      const rawValue = this.getDataValue('sana');
      return rawValue ? rawValue.toISOString().split('T')[0] : null;
    },
  })
  sana!: Date | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  telNomer!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  davlatRaqami!: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  gazlashgan!: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  ruxsatnoma!: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  texasmotr!: number | null;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  davlatTolovi!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  smart!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  umumiySumma!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  gazakt!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  gazaktTrip!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  sugurta!: number;
}
