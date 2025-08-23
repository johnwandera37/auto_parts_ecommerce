// Sample vehicle data for BMW and Mercedes-Benz models
export const vehicleData = [
  {
    name: "BMW",
    models: [
      {
        name: "1 Series",
        series: [
          {
            name: "E87 (1st Gen)",
            years: [
              {
                name: "2004-2007",
                engines: ["116i", "118i", "120i", "130i", "118d", "120d"],
              },
              {
                name: "2007-2011",
                engines: ["116i", "118i", "120i", "130i", "116d", "118d", "120d", "123d"],
              },
            ],
          },
          {
            name: "F20/F21 (2nd Gen)",
            years: [
              {
                name: "2011-2015",
                engines: ["114i", "116i", "118i", "125i", "M135i", "116d", "118d", "120d", "125d"],
              },
              {
                name: "2015-2019",
                engines: ["116i", "118i", "120i", "125i", "M140i", "116d", "118d", "120d", "125d"],
              },
            ],
          },
          {
            name: "F40 (3rd Gen)",
            years: [
              {
                name: "2019-Present",
                engines: ["118i", "120i", "128ti", "M135i", "116d", "118d", "120d"],
              },
            ],
          },
        ],
      },
      {
        name: "3 Series",
        series: [
          {
            name: "E90/E91/E92/E93 (5th Gen)",
            years: [
              {
                name: "2005-2008",
                engines: [
                  "316i",
                  "318i",
                  "320i",
                  "325i",
                  "330i",
                  "335i",
                  "M3",
                  "316d",
                  "318d",
                  "320d",
                  "325d",
                  "330d",
                  "335d",
                ],
              },
              {
                name: "2008-2012",
                engines: [
                  "316i",
                  "318i",
                  "320i",
                  "325i",
                  "328i",
                  "330i",
                  "335i",
                  "M3",
                  "316d",
                  "318d",
                  "320d",
                  "325d",
                  "330d",
                  "335d",
                ],
              },
            ],
          },
          {
            name: "F30/F31/F34 (6th Gen)",
            years: [
              {
                name: "2012-2015",
                engines: ["316i", "320i", "328i", "335i", "316d", "318d", "320d", "325d", "330d", "335d"],
              },
              {
                name: "2015-2019",
                engines: ["318i", "320i", "330i", "340i", "316d", "318d", "320d", "330d", "335d"],
              },
            ],
          },
          {
            name: "G20/G21 (7th Gen)",
            years: [
              {
                name: "2019-Present",
                engines: ["318i", "320i", "330i", "M340i", "318d", "320d", "330d", "M3"],
              },
            ],
          },
        ],
      },
      {
        name: "5 Series",
        series: [
          {
            name: "E60/E61 (5th Gen)",
            years: [
              {
                name: "2003-2007",
                engines: ["520i", "523i", "525i", "530i", "540i", "545i", "550i", "M5", "520d", "525d", "530d", "535d"],
              },
              {
                name: "2007-2010",
                engines: ["520i", "523i", "525i", "528i", "530i", "540i", "550i", "M5", "520d", "525d", "530d", "535d"],
              },
            ],
          },
          {
            name: "F10/F11/F07 (6th Gen)",
            years: [
              {
                name: "2010-2013",
                engines: ["520i", "523i", "528i", "530i", "535i", "550i", "M5", "518d", "520d", "525d", "530d", "535d"],
              },
              {
                name: "2013-2017",
                engines: ["520i", "528i", "530i", "535i", "550i", "M5", "518d", "520d", "525d", "530d", "535d", "550d"],
              },
            ],
          },
          {
            name: "G30/G31 (7th Gen)",
            years: [
              {
                name: "2017-2020",
                engines: ["520i", "530i", "540i", "M550i", "M5", "518d", "520d", "525d", "530d", "540d"],
              },
              {
                name: "2020-Present",
                engines: ["520i", "530i", "540i", "M550i", "M5", "518d", "520d", "530d", "540d"],
              },
            ],
          },
        ],
      },
      {
        name: "X5",
        series: [
          {
            name: "E53 (1st Gen)",
            years: [
              {
                name: "2000-2003",
                engines: ["3.0i", "4.4i", "4.6is", "3.0d"],
              },
              {
                name: "2003-2006",
                engines: ["3.0i", "4.4i", "4.8is", "3.0d"],
              },
            ],
          },
          {
            name: "E70 (2nd Gen)",
            years: [
              {
                name: "2006-2010",
                engines: ["3.0si", "4.8i", "X5 M", "3.0d", "3.5d", "4.0d"],
              },
              {
                name: "2010-2013",
                engines: ["3.5i", "5.0i", "X5 M", "3.0d", "4.0d"],
              },
            ],
          },
          {
            name: "F15 (3rd Gen)",
            years: [
              {
                name: "2013-2018",
                engines: ["35i", "40i", "50i", "X5 M", "25d", "30d", "40d", "M50d"],
              },
            ],
          },
          {
            name: "G05 (4th Gen)",
            years: [
              {
                name: "2018-Present",
                engines: ["40i", "50i", "X5 M", "25d", "30d", "40d", "M50d"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Mercedes-Benz",
    models: [
      {
        name: "A-Class",
        series: [
          {
            name: "W168 (1st Gen)",
            years: [
              {
                name: "1997-2001",
                engines: ["A140", "A160", "A190", "A160 CDI", "A170 CDI"],
              },
              {
                name: "2001-2004",
                engines: ["A140", "A160", "A190", "A210", "A160 CDI", "A170 CDI"],
              },
            ],
          },
          {
            name: "W169 (2nd Gen)",
            years: [
              {
                name: "2004-2008",
                engines: ["A150", "A170", "A200", "A160 CDI", "A180 CDI", "A200 CDI"],
              },
              {
                name: "2008-2012",
                engines: ["A150", "A170", "A200", "A160 CDI", "A180 CDI", "A200 CDI"],
              },
            ],
          },
          {
            name: "W176 (3rd Gen)",
            years: [
              {
                name: "2012-2015",
                engines: ["A180", "A200", "A250", "A45 AMG", "A160 CDI", "A180 CDI", "A200 CDI", "A220 CDI"],
              },
              {
                name: "2015-2018",
                engines: ["A160", "A180", "A200", "A250", "A45 AMG", "A160d", "A180d", "A200d", "A220d"],
              },
            ],
          },
          {
            name: "W177 (4th Gen)",
            years: [
              {
                name: "2018-Present",
                engines: ["A180", "A200", "A220", "A250", "A35 AMG", "A45 AMG", "A180d", "A200d", "A220d"],
              },
            ],
          },
        ],
      },
      {
        name: "C-Class",
        series: [
          {
            name: "W202 (1st Gen)",
            years: [
              {
                name: "1993-1997",
                engines: ["C180", "C200", "C220", "C230", "C280", "C36 AMG", "C220 Diesel", "C250 Diesel"],
              },
              {
                name: "1997-2000",
                engines: [
                  "C180",
                  "C200",
                  "C230",
                  "C240",
                  "C280",
                  "C43 AMG",
                  "C200 CDI",
                  "C220 CDI",
                  "C250 Turbodiesel",
                ],
              },
            ],
          },
          {
            name: "W203 (2nd Gen)",
            years: [
              {
                name: "2000-2004",
                engines: ["C180", "C200", "C230", "C240", "C320", "C32 AMG", "C200 CDI", "C220 CDI", "C270 CDI"],
              },
              {
                name: "2004-2007",
                engines: [
                  "C160",
                  "C180",
                  "C200",
                  "C230",
                  "C280",
                  "C350",
                  "C55 AMG",
                  "C200 CDI",
                  "C220 CDI",
                  "C320 CDI",
                ],
              },
            ],
          },
          {
            name: "W204 (3rd Gen)",
            years: [
              {
                name: "2007-2010",
                engines: [
                  "C180",
                  "C200",
                  "C230",
                  "C250",
                  "C280",
                  "C300",
                  "C350",
                  "C63 AMG",
                  "C200 CDI",
                  "C220 CDI",
                  "C320 CDI",
                  "C350 CDI",
                ],
              },
              {
                name: "2010-2014",
                engines: [
                  "C180",
                  "C200",
                  "C250",
                  "C300",
                  "C350",
                  "C63 AMG",
                  "C180 CDI",
                  "C200 CDI",
                  "C220 CDI",
                  "C250 CDI",
                  "C350 CDI",
                ],
              },
            ],
          },
          {
            name: "W205 (4th Gen)",
            years: [
              {
                name: "2014-2018",
                engines: [
                  "C160",
                  "C180",
                  "C200",
                  "C250",
                  "C300",
                  "C350",
                  "C400",
                  "C450 AMG",
                  "C43 AMG",
                  "C63 AMG",
                  "C180d",
                  "C200d",
                  "C220d",
                  "C250d",
                  "C300d",
                ],
              },
              {
                name: "2018-2021",
                engines: ["C180", "C200", "C300", "C43 AMG", "C63 AMG", "C180d", "C200d", "C220d", "C300d"],
              },
            ],
          },
          {
            name: "W206 (5th Gen)",
            years: [
              {
                name: "2021-Present",
                engines: ["C180", "C200", "C300", "C43 AMG", "C63 AMG", "C200d", "C220d", "C300d"],
              },
            ],
          },
        ],
      },
      {
        name: "E-Class",
        series: [
          {
            name: "W210 (2nd Gen)",
            years: [
              {
                name: "1995-1999",
                engines: [
                  "E200",
                  "E230",
                  "E240",
                  "E280",
                  "E320",
                  "E420",
                  "E55 AMG",
                  "E200 Diesel",
                  "E220 Diesel",
                  "E290 Turbodiesel",
                  "E300 Turbodiesel",
                ],
              },
              {
                name: "1999-2002",
                engines: [
                  "E200",
                  "E240",
                  "E280",
                  "E320",
                  "E430",
                  "E55 AMG",
                  "E200 CDI",
                  "E220 CDI",
                  "E270 CDI",
                  "E290 Turbodiesel",
                  "E320 CDI",
                ],
              },
            ],
          },
          {
            name: "W211 (3rd Gen)",
            years: [
              {
                name: "2002-2006",
                engines: [
                  "E200",
                  "E240",
                  "E280",
                  "E320",
                  "E500",
                  "E55 AMG",
                  "E200 CDI",
                  "E220 CDI",
                  "E270 CDI",
                  "E320 CDI",
                  "E400 CDI",
                ],
              },
              {
                name: "2006-2009",
                engines: [
                  "E200",
                  "E230",
                  "E280",
                  "E300",
                  "E350",
                  "E500",
                  "E63 AMG",
                  "E200 CDI",
                  "E220 CDI",
                  "E280 CDI",
                  "E300 CDI",
                  "E320 CDI",
                  "E420 CDI",
                ],
              },
            ],
          },
          {
            name: "W212 (4th Gen)",
            years: [
              {
                name: "2009-2013",
                engines: [
                  "E200",
                  "E250",
                  "E300",
                  "E350",
                  "E500",
                  "E63 AMG",
                  "E200 CDI",
                  "E220 CDI",
                  "E250 CDI",
                  "E300 CDI",
                  "E350 CDI",
                ],
              },
              {
                name: "2013-2016",
                engines: [
                  "E200",
                  "E250",
                  "E300",
                  "E350",
                  "E400",
                  "E500",
                  "E63 AMG",
                  "E200 CDI",
                  "E220 CDI",
                  "E250 CDI",
                  "E300 BlueTEC",
                  "E350 BlueTEC",
                ],
              },
            ],
          },
          {
            name: "W213 (5th Gen)",
            years: [
              {
                name: "2016-2020",
                engines: [
                  "E180",
                  "E200",
                  "E250",
                  "E300",
                  "E350",
                  "E400",
                  "E450",
                  "E43 AMG",
                  "E53 AMG",
                  "E63 AMG",
                  "E200d",
                  "E220d",
                  "E300d",
                  "E350d",
                  "E400d",
                ],
              },
              {
                name: "2020-Present",
                engines: [
                  "E200",
                  "E300",
                  "E350",
                  "E450",
                  "E53 AMG",
                  "E63 AMG",
                  "E200d",
                  "E220d",
                  "E300d",
                  "E350d",
                  "E400d",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "GLE-Class",
        series: [
          {
            name: "W166 (1st Gen)",
            years: [
              {
                name: "2015-2019",
                engines: [
                  "GLE300",
                  "GLE350",
                  "GLE400",
                  "GLE450 AMG",
                  "GLE43 AMG",
                  "GLE63 AMG",
                  "GLE250d",
                  "GLE350d",
                  "GLE400d",
                ],
              },
            ],
          },
          {
            name: "W167 (2nd Gen)",
            years: [
              {
                name: "2019-Present",
                engines: ["GLE350", "GLE450", "GLE53 AMG", "GLE63 AMG", "GLE300d", "GLE350d", "GLE400d"],
              },
            ],
          },
        ],
      },
    ],
  },
]
