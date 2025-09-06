import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Malumot } from './entities/malumotlar.model';
import { CreateMalumotlarDto } from './dto/create-malumotlar.dto';
import { UpdateMalumotlarDto } from './dto/update-malumotlar.dto';

@Injectable()
export class MalumotlarService {
  constructor(
    @InjectModel(Malumot)
    private malumotModel: typeof Malumot,
  ) {}

  private calculateUmumiySumma(dto: any): number {
    return (
      Number(dto.gazlashgan || 0) +
      Number(dto.ruxsatnoma || 0) +
      Number(dto.texasmotr || 0) +
      Number(dto.davlatTolovi || 0) +
      Number(dto.smart || 0) +
      Number(dto.texpasportalmashtirish || 0) +
      Number(dto.oldisotdi || 0) +
      Number(dto.yagonadacha || 0) +
      Number(dto.qaytajihoz || 0) +
      Number(dto.gazakt || 0) +
      Number(dto.gazaktTrip || 0) +
      Number(dto.sugurta || 0)
    );
  }

  async create(dto: CreateMalumotlarDto): Promise<Malumot> {
    const umumiySumma = this.calculateUmumiySumma(dto);

    return await this.malumotModel.create({
      ...dto,
      umumiySumma,
    } as any);
  }

  async update(id: number, dto: UpdateMalumotlarDto): Promise<Malumot> {
    const malumot = await this.malumotModel.findByPk(id);
    if (!malumot) {
      throw new NotFoundException('Malumot topilmadi');
    }

    const umumiySumma = this.calculateUmumiySumma(dto);

    return await malumot.update({ ...dto, umumiySumma });
  }

  async findAll(): Promise<Malumot[]> {
    return await this.malumotModel.findAll();
  }

  async findOne(id: number): Promise<Malumot> {
    const malumot = await this.malumotModel.findByPk(id);
    if (!malumot) throw new NotFoundException(`ID ${id} topilmadi`);
    return malumot;
  }

  async remove(id: number): Promise<void> {
    const malumot = await this.malumotModel.findByPk(id);
    if (!malumot) {
      throw new NotFoundException('Malumot topilmadi');
    }
    await malumot.destroy();
  }
}
