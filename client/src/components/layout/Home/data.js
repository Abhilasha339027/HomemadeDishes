import dish1 from "../../../media/dish1.jpg";
import dish2 from "../../../media/dish2.jpg";
import dish3 from "../../../media/dish3.jpg";
import chef1 from "../../../media/chef1.jpg";
import chef2 from "../../../media/chef2.jpg";
import chef3 from "../../../media/chef3.jpg";

export const data = {
  leadingText: "All about",
  slides: [
    {
      introline: "Shahzaib",
      id: "Chef1",
      content: {
        name: "Shahzaib",
        cuisine: "Indian",
        image: chef1,
        headImage: dish1,
        copy:
          "I was born and raised in India, where I began learning traditional recipes from my grandmother. I'm honored to share our family recipes at your kitchen table, and I hope they'll fill you with a feeling of home.",
      },
    },
    {
      introline: "Chef Carlos",
      id: "Chef Carlos",
      content: {
        name: "Chef Carlos",
        cuisine: "Pakistani",
        image: chef2,
        headImage: dish2,
        copy:
          "I learned to cook from my mother in our village in Pakistan. When we immigrated to the US, we brought along the flavors of our hometown. With YummyMaker.com, I can now share those flavors with my entire community.",
      },
    },
    {
      introline: "Chef Shaheer",
      id: "Chef Shaheer",
      content: {
        name: "Chef Shaheer",
        cuisine: "Chinese",
        image: chef3,
        headImage: dish3,
        copy:
          "Ever since leaving China, cooking is how I stay connected to my roots. YummyMaker.com has given me a sense of purpose and pride. Now I get to cook for my community and make a substantial income that I can rely on.",
      },
    },
  ],
};
