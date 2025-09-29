import type { Schema, Struct } from '@strapi/strapi';

export interface BerandaLineData extends Struct.ComponentSchema {
  collectionName: 'components_beranda_line_data';
  info: {
    displayName: 'Line Data';
    icon: 'priceTag';
  };
  attributes: {
    investasi: Schema.Attribute.Decimal & Schema.Attribute.Required;
    tahun: Schema.Attribute.BigInteger & Schema.Attribute.Required;
  };
}

export interface BerandaSectionHero extends Struct.ComponentSchema {
  collectionName: 'components_beranda_section_heroes';
  info: {
    displayName: 'Section Hero';
    icon: 'file';
  };
  attributes: {
    backgroundHero: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    ringkasan: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BerandaSectionPotensi extends Struct.ComponentSchema {
  collectionName: 'components_beranda_section_potensis';
  info: {
    displayName: 'Section Potensi';
    icon: 'briefcase';
  };
  attributes: {
    ringkasan: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BerandaSectionRealisasi extends Struct.ComponentSchema {
  collectionName: 'components_beranda_section_realisasis';
  info: {
    displayName: 'Section Realisasi';
    icon: 'chartPie';
  };
  attributes: {
    periodeRealisasi: Schema.Attribute.String & Schema.Attribute.Required;
    pma: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    pmdn: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    sumber: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BerandaSectionTujuan extends Struct.ComponentSchema {
  collectionName: 'components_beranda_section_tujuans';
  info: {
    displayName: 'Section Tujuan';
    icon: 'clock';
  };
  attributes: {
    lineData: Schema.Attribute.Component<'beranda.line-data', true>;
    listLogo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    tagline: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface KecamatanGalleryKecamatan extends Struct.ComponentSchema {
  collectionName: 'components_kecamatan_gallery_kecamatans';
  info: {
    displayName: 'Gallery Kecamatan';
    icon: 'dashboard';
  };
  attributes: {
    thumbnail: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    youtubeUrl: Schema.Attribute.String;
  };
}

export interface KecamatanPotensiKecamatan extends Struct.ComponentSchema {
  collectionName: 'components_kecamatan_potensi_kecamatans';
  info: {
    displayName: 'Potensi Kecamatan';
    icon: 'paperPlane';
  };
  attributes: {
    potensi_investasi: Schema.Attribute.Relation<
      'oneToOne',
      'api::potensi-investasi.potensi-investasi'
    >;
    potensiRingkasan: Schema.Attribute.Component<
      'kecamatan.potensi-kecamatan-ringkasan',
      true
    >;
  };
}

export interface KecamatanPotensiKecamatanRingkasan
  extends Struct.ComponentSchema {
  collectionName: 'components_kecamatan_potensi_kecamatan_ringkasans';
  info: {
    displayName: 'Potensi Kecamatan Ringkasan';
    icon: 'bulletList';
  };
  attributes: {
    ringkasan: Schema.Attribute.String;
  };
}

export interface TentangKamiMisi extends Struct.ComponentSchema {
  collectionName: 'components_tentang_kami_misis';
  info: {
    displayName: 'Misi';
    icon: 'crown';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      [
        'PiTreasureChestDuotone',
        'PiTimerDuotone',
        'PiGlobeStandFill',
        'PiThumbsUpDuotone',
        'PiChartLineDuotone',
        'PiArrowClockwiseDuotone',
        'PiChatsCircleDuotone',
      ]
    >;
    misi: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'beranda.line-data': BerandaLineData;
      'beranda.section-hero': BerandaSectionHero;
      'beranda.section-potensi': BerandaSectionPotensi;
      'beranda.section-realisasi': BerandaSectionRealisasi;
      'beranda.section-tujuan': BerandaSectionTujuan;
      'kecamatan.gallery-kecamatan': KecamatanGalleryKecamatan;
      'kecamatan.potensi-kecamatan': KecamatanPotensiKecamatan;
      'kecamatan.potensi-kecamatan-ringkasan': KecamatanPotensiKecamatanRingkasan;
      'tentang-kami.misi': TentangKamiMisi;
    }
  }
}
