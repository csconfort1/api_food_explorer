const AppError = require("../../utils/AppError");
require("dotenv/config");

const MealRepository = require("../../repositories/meal/MealRepository");
const MealCreateService = require("./MealCreateService");

describe("MealCreateService", () => {
  let mealRepository;
  let mealCreateService;

  beforeEach(() => {
    mealRepository = new MealRepository();
    mealCreateService = new MealCreateService(mealRepository);
  });

  it("must register a meal success", async () => {
    const meal = {
      title: "Salada Molla",
      description: "Salada",
      category: "Principais",
      price: "19,97",
      
    };

    const result = await mealCreateService.execute(meal);

    expect(result).toHaveProperty("id");
  });

  it("should return a 'title already registered' error", async () => {
    const meal = {
       title: "Salada Molla",
       description: "Salada",
       category: "Principais",
       price: "19,97",
     
    };

    await mealCreateService.execute(meal);

    const mealSameTitle = meal;

    await expect(mealCreateService.execute(mealSameTitle)).rejects.toEqual(new AppError("Título em uso."));
  });
});