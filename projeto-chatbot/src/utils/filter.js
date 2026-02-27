export function isComplex(message) {
  const complexWords = [
    "explique tudo",
    "completo",
    "detalhado",
    "história inteira",
    "mapa completo"
  ];

  return complexWords.some(word =>
    message.toLowerCase().includes(word)
  );
}