import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { createSlug } from '../../utils/slug';
import { nanoid } from 'nanoid';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    createCategoryDto.slug = await this.createSlug(createCategoryDto.name);

    if (createCategoryDto.parentId) {
      createCategoryDto.parent = await this.categoryRepository.findOne({
        where: { id: createCategoryDto.parentId },
      });
    }

    await this.categoryRepository.save(createCategoryDto);

    return 'Category created successfully';
  }

  async findAll(options?: FindManyOptions<Category>) {
    return await this.categoryRepository.find({
      ...options,
      relations: ['parent'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  async createSlug(name: string, attempt = 1) {
    let slug = createSlug(name);

    // Check if the slug already exists
    const existingSlugs = await this.findAll({
      where: { slug },
    });

    // If the slug already exists, append a numeric suffix
    if (existingSlugs.length > 0) {
      slug = `${slug}-${nanoid(4)}`;
      // Recursive call with the updated slug and incremented attempt
      return this.createSlug(slug, attempt + 1);
    } else {
      // If the slug is unique, return it
      return slug;
    }
  }
}
