import prisma from "../lib/prisma";

class Category {
  constructor(
    public id: number,
    public name: string,
    public product?: Partial<Category>
  ) {}

  static async create(newName: string): Promise<Category> {
    const { id, name } = await prisma.category.create({
      data: {
        name: newName,
      },
    });

    return new Category(id, name);
  }
  static async get(categoryName: string): Promise<Category> {
    const category = await prisma.category.findUnique({
      where: {
        name: categoryName,
      },
      include: {
        products: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }
  static async delete(id: number): Promise<Category | null> {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });

    return category;
  }
}
export default Category;
