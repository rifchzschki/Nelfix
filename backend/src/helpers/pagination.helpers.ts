import * as Handlebars from 'handlebars';

// Helper untuk penambahan
Handlebars.registerHelper('add', (a: number, b: number) => a + b);

// Helper untuk pengurangan
Handlebars.registerHelper('subtract', (a: number, b: number) => a - b);

// Helper untuk perkalian
Handlebars.registerHelper('multiply', (a: number, b: number) => a * b);

// Helper untuk perbandingan lebih besar
Handlebars.registerHelper('gt', (a: number, b: number) => a > b);

// Helper untuk perbandingan lebih kecil
Handlebars.registerHelper('lt', (a: number, b: number) => a < b);