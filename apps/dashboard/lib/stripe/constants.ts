export const getPlanFromUsageLimit = (usageLimit: number) => {
  return PRO_TIERS.find((tier) => tier.quota === usageLimit)?.name || "Free";
};

export const PRO_TIERS = [
  {
    name: "Pro 5",
    quota: 5,
    price: {
      monthly: {
        amount: 20,
        priceIds: {
          test: "price_1N5UIOSCAFqehjqXWkaIeynG",
          production: "price_1N5UAoSCAFqehjqXPoBNOqSw",
        },
      },
      yearly: {
        amount: 200,
        priceIds: {
          test: "price_1N5UIOSCAFqehjqXWUmVJT3H",
          production: "price_1MaakTSCAFqehjqXIua6qsKe",
        },
      },
    },
  },
  {
    name: "Pro 10",
    quota: 10,
    price: {
      monthly: {
        amount: 40,
        priceIds: {
          test: "price_1N5ULQSCAFqehjqXDlhVFNr1",
          production: "price_1MaamLSCAFqehjqXX7FHbLvM",
        },
      },
      yearly: {
        amount: 400,
        priceIds: {
          test: "price_1N5ULQSCAFqehjqXgQ7zRtGL",
          production: "price_1MaamLSCAFqehjqXNWU443HS",
        },
      },
    },
  },
  {
    name: "Pro 15",
    quota: 15,
    price: {
      monthly: {
        amount: 60,
        priceIds: {
          test: "price_1MaNkjSCAFqehjqXJVtaxe83",
          production: "price_1MaanESCAFqehjqXltokiVXK",
        },
      },
      yearly: {
        amount: 600,
        priceIds: {
          test: "price_1MaNkkSCAFqehjqXDBsxVXOd",
          production: "price_1MaanESCAFqehjqXlkp4nIxL",
        },
      },
    },
  },
  {
    name: "Pro 20",
    quota: 20,
    price: {
      monthly: {
        amount: 80,
        priceIds: {
          test: "price_1MaNqwSCAFqehjqXUMa8y2yd",
          production: "price_1MaaopSCAFqehjqXQjsAWWGO",
        },
      },
      yearly: {
        amount: 800,
        priceIds: {
          test: "price_1MaNqwSCAFqehjqXpNspqtGn",
          production: "price_1MaaopSCAFqehjqXvoYMnDUv",
        },
      },
    },
  },
  {
    name: "Pro 25",
    quota: 25,
    price: {
      monthly: {
        amount: 100,
        priceIds: {
          test: "price_1MaNxySCAFqehjqXbmNVO37v",
          production: "price_1MaauESCAFqehjqX9j9NdykO",
        },
      },
      yearly: {
        amount: 1000,
        priceIds: {
          test: "price_1MaNxySCAFqehjqXRoWXEnKw",
          production: "price_1MaauESCAFqehjqXNuLHFKT2",
        },
      },
    },
  },
  {
    name: "Pro 50",
    quota: 50,
    price: {
      monthly: {
        amount: 200,
        priceIds: {
          test: "price_1MaO9BSCAFqehjqXdu79dNio",
          production: "price_1MaavdSCAFqehjqXbZmWiQ5K",
        },
      },
      yearly: {
        amount: 2000,
        priceIds: {
          test: "price_1MaO9ASCAFqehjqXdPHDKKud",
          production: "price_1MaavdSCAFqehjqXOvwbRvXU",
        },
      },
    },
  },
];
