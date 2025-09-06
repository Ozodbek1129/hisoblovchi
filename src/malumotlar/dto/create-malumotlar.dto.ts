import { 
    IsString, 
    IsNotEmpty, 
    IsOptional, 
    IsNumber, 
    IsBoolean, 
    IsDate 
  } from 'class-validator';
  
  export class CreateMalumotlarDto {
    @IsNumber()
    @IsNotEmpty()
    tartibRaqami: number;
  
    @IsDate()
    @IsNotEmpty()
    sana: Date;
  
    @IsString()
    @IsNotEmpty()
    fullName: string;
  
    @IsString()
    @IsNotEmpty()
    telNomer: string;
  
    @IsString()
    @IsNotEmpty()
    davlatRaqami: string;
  
    @IsNumber()
    @IsOptional()
    gazlashgan?: number;
  
    @IsNumber()
    ruxsatnoma?: number;

    @IsNumber()
    qaytajihoz?: number;

    @IsNumber()
    oldisotdi?: number;

    @IsNumber()
    yagonadacha?: number;

    @IsNumber()
    texpasportalmashtirish?: number;

    @IsNumber()
    gazakt?: number;
    
    @IsNumber()
    gazaktTrip?: number;

    @IsNumber()
    sugurta?: number;
  
    @IsNumber()
    @IsOptional()
    texasmotr?: number; 
  
    @IsNumber()
    @IsOptional()
    davlatTolovi?: number;
  
    @IsNumber()
    @IsOptional()
    smart?: number;
  }
  