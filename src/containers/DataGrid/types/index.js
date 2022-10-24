export const TYPES = [
  {
    name: "DATE",
    types: [
      {
        label: "is",
        value: "EQ",
        children: [
          { label: "Today", value: "TODAY" },
          { label: "Yesterday", value: "YESTERDAY" },
          { label: "Tomorrow", value: "TOMORROW" },
          {
            label: "Last",
            value: "LAST",
            hasNext: true,
            children: [
              { label: "Day", value: "DAY" },
              { label: "Week", value: "WEEK" },
              { label: "Month", value: "MONTH" },
              { label: "Year", value: "YEAR" },
            ],
          },
          {
            label: "Next",
            value: "NEXT",
            hasNext: true,
            children: [
              { label: "Day", value: "DAY" },
              { label: "Week", value: "WEEK" },
              { label: "Month", value: "MONTH" },
              { label: "Year", value: "YEAR" },
            ],
          },
          {
            label: "This",
            value: "THIS",
            hasNext: true,
            inputNot: true,
            children: [
              { label: "Day", value: "DAY" },
              { label: "Week", value: "WEEK" },
              { label: "Month", value: "MONTH" },
              { label: "Year", value: "YEAR" },
            ],
          },
          { label: "Exact", value: "EQUAL", hasNext: true },
          { label: "After date", value: "GT", hasNext: true },
          { label: "Before date", value: "LT", hasNext: true },
          { label: "Date range", value: "RA", hasNext: true },
        ],
      },
      {
        label: "is not",
        value: "NOT",
        children: [
          { label: "Today", value: "TODAY" },
          { label: "Yesterday", value: "YESTERDAY" },
          { label: "Tomorrow", value: "TOMORROW" },
          {
            label: "Last",
            value: "LAST",
            hasNext: true,
            children: [
              { label: "Day", value: "DAY" },
              { label: "Week", value: "WEEK" },
              {
                label: "Month",
                value: "MONTH",
              },
              { label: "Year", value: "YEAR" },
            ],
          },
          {
            label: "Next",
            value: "NEXT",
            hasNext: true,
            children: [
              { label: "Day", value: "DAY" },
              { label: "Week", value: "WEEK" },
              {
                label: "Month",
                value: "MONTH",
              },
              { label: "Year", value: "YEAR" },
            ],
          },
          {
            label: "This",
            value: "THIS",
            hasNext: true,
            children: [
              { label: "Day", value: "DAY" },
              { label: "Week", value: "WEEK" },
              {
                label: "Month",
                value: "MONTH",
              },
              { label: "Year", value: "YEAR" },
            ],
          },
          { label: "Exact", value: "EQUAL", hasNext: true },
          { label: "After date", value: "GT", hasNext: true },
          { label: "Before date", value: "LT", hasNext: true },
          { label: "Date range", value: "RA", hasNext: true },
        ],
      },
      { label: "is set", value: "IS_SET" },
      {
        label: "is not set",
        value: "IS_NOT_SET",
      },
    ],
  },
  {
    name: "NUMBER",
    types: [
      { label: "Equals", value: "EQ" },
      { label: "Not equal to", value: "NOT" },
      { label: "Greater than", value: "GT" },
      { label: "Less than", value: "LT" },
      { label: "Greater than or equal", value: "GTE" },
      { label: "Less than or equal", value: "LTE" },
      { label: "Range", value: "RA", twoInput: true },
      { label: "is set", value: "IS_SET", isLastSelect: true },
      {
        label: "is not set",
        value: "IS_NOT_SET",
        isLastSelect: true,
      },
    ],
  },
  {
    name: "MONEY",
    types: [
      { label: "Equals", value: "EQ" },
      { label: "Not equal to", value: "NOT" },
      { label: "Greater than", value: "GT" },
      { label: "Less than", value: "LT" },
      { label: "Greater than or equal", value: "GTE" },
      { label: "Less than or equal", value: "LTE" },
      { label: "Range", value: "RA", twoInput: true },
      { label: "is set", value: "IS_SET", isLastSelect: true },
      {
        label: "is not set",
        value: "IS_NOT_SET",
        isLastSelect: true,
      },
    ],
  },
  {
    name: "RATING",
    types: [
      { label: "Equals", value: "EQ" },
      { label: "Not equal to", value: "NOT" },
      { label: "Greater than", value: "GT" },
      { label: "Less than", value: "LT" },
      { label: "Greater than or equal", value: "GTE" },
      { label: "Less than or equal", value: "LTE" },
      { label: "Range", value: "RA", twoInput: true },
      { label: "is set", value: "IS_SET", isLastSelect: true },
      {
        label: "is not set",
        value: "IS_NOT_SET",
        isLastSelect: true,
      },
    ],
  },
  {
    name: "DROPDOWN",
    types: [
      { label: "Is", value: "EQ", hasNext: true },
      { label: "Is not", value: "NOT", hasNext: true },
      { label: "Is set", value: "IS_SET", isLastSelect: true },
      {
        label: "is not set",
        value: "IS_NOT_SET",
        isLastSelect: true,
      },
    ],
  },
  {
    name: "LABELS",
    types: [
      {
        label: "Is",
        value: "EQ",
        children: [
          { label: "Any", value: "ANY" },
          { label: "All", value: "ALL" },
        ],
      },
      {
        label: "Is not",
        value: "NOT",
        children: [
          { label: "Any", value: "ANY" },
          { label: "All", value: "ALL" },
        ],
      },
      { label: "Is set", value: "IS_SET", isLastSelect: true },
      { label: "is not set", value: "IS_NOT_SET", isLastSelect: true },
    ],
  },
  {
    name: "SHORT_TEXT",
    types: [
      { label: "Contains", value: "EQ" },
      { label: "Does not contain", value: "NOT" },
      { label: "Is set", value: "IS_SET", isLastSelect: true },
      { label: "is not set", value: "IS_NOT_SET", isLastSelect: true },
    ],
  },
  {
    name: "LONG_TEXT",
    types: [
      { label: "Contains", value: "EQ" },
      { label: "Does not contain", value: "NOT" },
      { label: "Is set", value: "IS_SET", isLastSelect: true },
      {
        label: "is not set",
        value: "IS_NOT_SET",
        isLastSelect: true,
      },
    ],
  },
  {
    name: "PHONE",
    types: [
      { label: "Contains", value: "EQ" },
      { label: "Does not contain", value: "NOT" },
      { label: "Is set", value: "IS_SET", isLastSelect: true },
      { label: "is not set", value: "IS_NOT_SET", isLastSelect: true },
    ],
  },
  {
    name: "EMAIL",
    types: [
      { label: "Contains", value: "EQ" },
      { label: "Does not contain", value: "NOT" },
      { label: "Is set", value: "IS_SET", isLastSelect: true },
      {
        label: "is not set",
        value: "IS_NOT_SET",
        isLastSelect: true,
      },
    ],
  },
  {
    name: "FILES",
    types: [
      { label: "Is set", value: "IS_SET", isLastSelect: true },
      {
        label: "is not set",
        value: "IS_NOT_SET",
        isLastSelect: true,
      },
    ],
  },
  {
    name: "CHECKBOX",
    types: [
      { label: "Is checked", value: "EQ", isLastSelect: true },
      { label: "Is not checked", value: "NOT", isLastSelect: true },
    ],
  },
  {
    name: "SPECIAL_LABEL",
    types: [
      { label: "Equals", value: "EQ" },
      { label: "Not equal to", value: "NOT" },
      { label: "Greater than", value: "GT" },
      { label: "Less than", value: "LT" },
      { label: "Greater than or equal", value: "GTE" },
      { label: "Less than or equal", value: "LTE" },
      { label: "Range", value: "RA", twoInput: true },
      { label: "is set", value: "IS_SET", isLastSelect: true },
      {
        label: "is not set",
        value: "IS_NOT_SET",
        isLastSelect: true,
      },
    ],
  },
  {
    name: "CALL_TYPE",
    types: [
      { label: "Is", value: "EQ", hasNext: true },
      { label: "Is not", value: "NOT", hasNext: true },
      { label: "Is set", value: "IS_SET", isLastSelect: true },
      {
        label: "is not set",
        value: "IS_NOT_SET",
        isLastSelect: true,
      },
    ],
  },
  {
    name: "CALL_STATUS",
    types: [
      { label: "Is", value: "EQ", hasNext: true },
      { label: "Is not", value: "NOT", hasNext: true },
      { label: "Is set", value: "IS_SET", isLastSelect: true },
      {
        label: "is not set",
        value: "IS_NOT_SET",
        isLastSelect: true,
      },
    ],
  },
  {
    name: "TREE",
    types: [
      { label: "Is", value: "EQ", hasNext: true },
      { label: "Is not", value: "NOT", hasNext: true },
      { label: "Is set", value: "IS_SET", isLastSelect: true },
      {
        label: "is not set",
        value: "IS_NOT_SET",
        isLastSelect: true,
      },
    ],
  },
];
