
const PREVIOUS_POSITION = -1;
const NEXT_POSITION = 1;
const SAME_POSITION = 0;

export async function fetchSettingsPageData() {
  try {
    const triviaCategories = await fetch(
      'https://opentdb.com/api_category.php',
    );
    const { trivia_categories: categories } = await triviaCategories.json();
    return {
      availableCategories: [
        {
          id: 'any',
          name: 'Any',
        },
        ...categories.sort((a, b) => {
          if (a.name < b.name) {
            return PREVIOUS_POSITION;
          }
          if (a.name > b.name) {
            return NEXT_POSITION;
          }
          return SAME_POSITION;
        }).map((category) => ({
          id: category.id,
          name: category.name,
        })),
      ],
      availableDifficulties: [
        {
          id: 'any',
          name: 'Any',
        },
        {
          id: 'easy',
          name: 'Easy',
        },
        {
          id: 'medium',
          name: 'Medium',
        },
        {
          id: 'hard',
          name: 'Hard',
        },
      ],
      availableTypes: [
        {
          id: 'any',
          name: 'Any',
        },
        {
          id: 'multiple',
          name: 'Multiple Choice',
        },
        {
          id: 'boolean',
          name: 'True / False',
        },
      ],
    };
  } catch (error) {
    return error;
  }
}
