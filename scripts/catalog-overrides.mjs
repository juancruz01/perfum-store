/**
 * Ajustes manuales del catálogo.
 *
 * NAME_FIXES: corrige errores de tipeo del PDF del proveedor.
 * GENDER_OVERRIDES: asigna género cuando el nombre no lo indica.
 *   Se evalúan en orden y gana la primera coincidencia, así que las reglas
 *   específicas (ej. "EROS POUR FEMME") deben ir antes que las generales ("EROS").
 *   Lo que no coincide con ninguna regla ni con las palabras clave (FEM, MASC, MEN,
 *   WOMAN, UNISEX...) queda como "unisex" y aparece en ambas secciones.
 */

export const NAME_FIXES = [
  [/1OOML|1O0ML/g, "100ML"],
  [/\bLATTFA\b/g, "LATTAFA"],
  [/\bTHAMEER\b/g, "THAMEEN"],
  [/\bCONFIDENTAL\b/g, "CONFIDENTIAL"],
  [/\bPOSION\b/g, "POISON"],
  [/\bLA BIE\b/g, "LA VIE"],
  [/YELLOW DIAMON\b/g, "YELLOW DIAMOND"],
  [/\bCARITER\b/g, "CARTIER"],
  [/\bENIMGA\b/g, "ENIGMA"],
  [/\bREFELCTION\b/g, "REFLECTION"],
  [/\bCALIFORNA\b/g, "CALIFORNIA"],
  [/\bTOCUH\b/g, "TOUCH"],
  [/\bFRACIHE\b/g, "FRAICHE"],
  [/\bCRIMSOM\b/g, "CRIMSON"],
  [/\bHUNTE\b/g, "HUNTER"],
  [/\bDYSNASTY\b/g, "DYNASTY"],
  [/\bCOLEECTION\b/g, "COLLECTION"],
  [/LE PANH[ÉE]RE|LE PANTH[ÉE]RE/g, "LA PANTHÈRE"],
  [/\bTUBUREUSE\b/g, "TUBÉREUSE"],
  [/\bLAVANDER\b/g, "LAVENDER"],
  [/\bOL,AF\b/g, "OLAF"],
  [/\bL AVENTURE\b/g, "L'AVENTURE"],
  [/^MISS DIOR BLOOMING/, "DIOR MISS DIOR BLOOMING"],
  [/AFNAN 9PM PURPLE POUR FEMME$/g, "AFNAN 9PM PURPLE POUR FEMME 100ML"],
  [/\bPLATINIUM\b/g, "PLATINUM"],
  [/L\s?́\s?INTERDIT/g, "L'INTERDIT"],
  [/\bMASION\b|\bALHMABRA\b/g, (m) => (m === "MASION" ? "MAISON" : "ALHAMBRA")],
  [/\bFRENCH AVENEU\b/g, "FRENCH AVENUE"],
  [/\bUNISSEEX\b/g, "UNISSEX"],
  [/\bCOLLECTORS\b/g, "COLLECTOR'S"],
  [/\bEDT100ML\b/g, "EDT 100ML"],
  [/\bRED SKY EPD\b/g, "RED SKY EDP"],
  [/\bEDIT\. LIMITED\b/g, "EDICIÓN LIMITADA"],
  [/\bLATTAFA P\. NEBRAS\b/g, "LATTAFA PRIDE NEBRAS"],
];

const M = "masculino";
const F = "femenino";
const U = "unisex";

export const GENDER_OVERRIDES = [
  // ---------------- Lattafa ----------------
  ["AJWAD PINK TO PINK", F], ["AMEERAT AL ARAB", F], ["YARA", F], ["ECLAIRE", F], ["EMAAN", F],
  ["LATTAFA HAYA ", F], ["ANGHAM", F], ["HAYAATI FLORENCE", F], ["HAYAATI GOLD ELIXIR", U],
  ["HAYAATI", M], ["AL NOBLE AMEER", M], ["AL NOBLE WAZEER", M], ["MAAHIR", M],
  ["ASAD", M], ["NOBLE BLUSH", F], ["BAYAAN", M], ["FAKHAR ROSE GOLD", F], ["MOHRA SILKY ROSE", F],
  ["MAYAR NATURAL", F], ["MAYAR ROSA", F], ["THAMEEN MUSK", F], ["JASOOR", M], ["VINTAGE RADIO", M],
  ["LATTAFA VICTORIA", F], ["RAED", M], ["SAKEENA", F], ["SHAHEEN", M], ["EMEER", M],
  ["HIS CONFESSION", M], ["SONDOS", F], ["QAA'ED", M], ["MUSK SALAMA", F], ["HAYAAM", F],
  ["LIAM BLUE", M],

  // ---------------- Afnan ----------------
  ["9AM CORAL", F], ["9PM PURPLE", F], ["9PM", M], ["9AM DIVE", M], ["SUPREMACY PINK", F],
  ["SUPREMACY TAPIS ROUGE", F], ["SUPREMACY IN HEAVEN", U], ["SUPREMACY", M],
  ["SOUVENIR BLOOMING", F], ["SOUVENIR NEGRO", M], ["TURATHI BLUE", M], ["THURATI AZUL", M],
  ["RARE TIFFANY", F],

  // ---------------- Armaf ----------------
  ["CLUB DE NUIT INTENSE", M], ["CLUB DE NUIT MALEKA", F], ["CLUB DE NUIT PRECIEUX", M],
  ["CLUB DE NUIT URBAN", M], ["CLUB DE NUIT ICONIC", M], ["CLUB DE NUIT LIONHEART", M],
  ["CLUB DE NUIT HUNTER", M], ["ODYSSEY AQUA", M], ["ODYSSEY MANDARIN", M], ["ODYSSEY TYRANT", M],
  ["ODYSSEY WILD ONE", M], ["ODYSSEY MEGA", M], ["ODYSSEY MARSHMALLOW", F], ["ODYSSEY CANDEE", F],
  ["EAU DE MONTAGNE", M], ["ODYSSEY REVOLUTION", M], ["ARMAF YUM YUM", F], ["ARMAF ADMIRAL", M],
  ["EGO EXOTIC", M], ["EGO TIGRE", M], ["CHECK MATE KING", M], ["THE LIONS CLUB", M],

  // ---------------- Al Haramain ----------------
  ["AMBER OUD CARBON", M], ["STORY MY LIFE", F], ["HARAMAIN BELLE", F], ["L'AVENTURE BLANCHE", F],
  ["L'AVENTURE ROSE", F], ["L'AVENTURE IRIS", F], ["L'AVENTURE KNIGHT", M], ["L'AVENTURE GOLD", M],

  // ---------------- Bharara ----------------
  ["BHARARA KING", M], ["BHARARA VIKING", M], ["BHARARA ONYX", M], ["BHARARA PHARAOH", M],
  ["BHARARA OCEAN", M], ["BHARARA SCARLET", F], ["BHARARA FANTASY", F], ["BHARARA BLOSSOM", F],
  ["ROME IVORY", M],

  // ---------------- French Avenue / Rasasi / Riiffs / Rayhaan ----------------
  ["LIQUID BRUN", M], ["FRENCH AVENUE RIPPLE", M], ["FRENCH AVENUE NEGRO", M], ["SPECTRE GHOST", M],
  ["VENENO SCARLET", F], ["HAWAS", M], ["SHUHRAH", M], ["RIIFFS IMPERIAL BLUE", M],
  ["RAYHAAN ITALIA", M],

  // ---------------- Maison Alhambra / Emper / otros árabes ----------------
  ["COMO MOISELLE", F], ["GLACIER", M], ["INFINI ROSE", F], ["PHILOS", M], ["JEAN LOWE", M],
  ["CANDID", F], ["BLACK ORIGAMI", M], ["SALVO", M], ["YEAH!", M], ["TOSCANO LEATHER", M],
  ["EMPER STALLION", M], ["MYKONOS APHRODITE", F], ["AMERAATI", F], ["SABAH AL WARD", F],
  ["OUD SPORT", M],

  // ---------------- Sets ----------------
  ["KIT HAYATI", M], ["KIT BHARARA KING", M], ["KIT ARMAF MINIATURA SILLAGE", M],
  ["NOT ONLY INTENSE", M],

  // ---------------- Diseñador ----------------
  ["GAME OF SPADES PARFUM 100ML KING GOLD", M],
  ["LE MALE", M], ["LE BEAU", M], ["LA BELLE", F], ["DIVINE", F], ["CLASSIQUE", F],
  ["VALENTINA", F],
  ["BRIGHT CRYSTAL", F], ["EROS POUR FEMME", F], ["EROS", M], ["YELLOW DIAMOND", F],
  ["CRYSTAL NOIR", F], ["VERSACE POUR HOMME", M], ["DYLAN BLUE EDT", M],
  ["SAUVAGE", M], ["J`ADORE", F], ["J'ADORE", F], ["ADDICT", F], ["DIOR DUNE", F], ["POISON", F],
  ["MY WAY", F], ["STRONGER WITH YOU", M], ["CODE", M], ["PASSIONE", F], ["ACQUA DE GIOIA", F],
  ["SÍ EDP", F],
  ["CHER ZARCI", F], ["BENSIMON BOLD INTENSE", M], ["KING OF SEDUCTION", M],
  ["INVICTUS", M], ["PHANTOM", M], ["ONE MILLION", M], ["PACO RABANNE FAME", F], ["BLACK XS", M],
  ["OLYMP", F],
  ["LIBRE", F], ["SAINT LAURENT Y ", M], ["MYSLF", M],
  ["WANTED GIRL", F], ["WANTED", M], ["CHROME", M],
  ["LA BOMBA BY", F], ["212 MEN", M], ["212 HEROES FOREVER BY", F], ["212 SEXY", F],
  ["GOOD GIRL", F], ["212 VIP BLACK", M], ["212 VIP BY", F], ["BAD BOY", M],
  ["INTERDIT", F], ["ANGE OU DEMON", F], ["IRRESISTIBLE", F],
  ["TOM FORD BY TOM FORD", M], ["GREY VETIVER", M], ["NOIR BY TOM FORD", M],
  ["VELVET ORCHID", F], ["VIOLET BLONDE", F],
  ["AVENTUS FOR HER", F], ["AVENTUS", M], ["VIKING COLOGNE", M], ["CARMINA", F],
  ["IRIS TUBÉREUSE", F], ["ROYAL PRINCESS OUD", F], ["WIND FLOWERS", F],
  ["AMBERO BY", M], ["FALKAR", M], ["ONEKH", M], ["YASEP", M], ["DESIRIA", F], ["NYLAIAI", F],
  ["RUBINIA", F], ["VERIDIA", F], ["ZAHIRA", F],
  ["CASSILLI", F], ["DARLEY", M], ["DELINA", F], ["GODOLPHIN", M], ["LAYTON", M], ["PEGASUS", M],
  ["PERCIVAL", M], ["SAFANAD", F], ["SEDLEY", M], ["ALTHAIR", M], ["HALTANE", M], ["HEROD", M],
  ["PERSEUS", M], ["VALAYA", F],
  ["ROSES MUSK", F], ["VELVET FLOWERS", F], ["GOLD FLOWERS", F], ["VELVET FANTASY", F],
  ["LA VIE EST BELLE", F],
  ["LEGEND", M], ["HUGO DARK BLUE", M], ["HUGO ENERGISE", M], ["BOTTLED", M],
  ["POLO", M], ["JIMMY CHOO FEVER", F], ["ROSE PASSION", F],
  ["BEAUTY BY CALVIN", F], ["CONTRADICTION", F],
  ["SPICEBOMB", M], ["ANGEL NOVA", F], ["ALIEN", F],
].map(([needle, g]) => [needle, g]);

// Para que U quede referenciada aunque sólo se use como valor por defecto.
export const DEFAULT_GENDER = U;
