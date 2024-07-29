import type { Schema, Attribute } from '@strapi/strapi';

export interface CmsAccordion extends Schema.Component {
  collectionName: 'components_cms_accordions';
  info: {
    displayName: 'Accordion';
    description: '';
  };
  attributes: {
    accordionList: Attribute.Component<'items.accordion-items', true>;
  };
}

export interface CmsButton extends Schema.Component {
  collectionName: 'components_cms_buttons';
  info: {
    displayName: 'Button';
    description: '';
  };
  attributes: {
    content: Attribute.String;
    style: Attribute.Enumeration<['btn-primary', 'btn-outline-primary']>;
    link: Attribute.String;
  };
}

export interface CmsCarousel extends Schema.Component {
  collectionName: 'components_cms_carousels';
  info: {
    displayName: 'Carouse';
    description: '';
  };
  attributes: {
    carousel: Attribute.Component<'items.carousel-items', true>;
    vh: Attribute.Enumeration<['vh-25', 'vh-50', 'vh-75', 'vh-100']>;
  };
}

export interface CmsCoinChart extends Schema.Component {
  collectionName: 'components_cms_coin_charts';
  info: {
    displayName: 'CoinChart';
  };
  attributes: {
    symbol: Attribute.String;
    height: Attribute.String;
    interval: Attribute.String;
    theme: Attribute.String;
  };
}

export interface CmsCollection extends Schema.Component {
  collectionName: 'components_cms_collections';
  info: {
    displayName: 'Collection';
  };
  attributes: {
    endpoint: Attribute.String;
  };
}

export interface CmsContentImage extends Schema.Component {
  collectionName: 'components_cms_content_images';
  info: {
    displayName: 'ContentImage';
    description: '';
  };
  attributes: {
    button: Attribute.Component<'cms.button'>;
    image: Attribute.Media;
    reverse: Attribute.Boolean & Attribute.DefaultTo<false>;
    content: Attribute.Blocks;
  };
}

export interface CmsContent extends Schema.Component {
  collectionName: 'components_cms_contents';
  info: {
    displayName: 'content';
    description: '';
  };
  attributes: {
    content: Attribute.Blocks;
  };
}

export interface CmsDisclaimer extends Schema.Component {
  collectionName: 'components_cms_disclaimers';
  info: {
    displayName: 'Disclaimer';
  };
  attributes: {
    content: Attribute.Blocks;
  };
}

export interface CmsHeadline extends Schema.Component {
  collectionName: 'components_cms_headlines';
  info: {
    displayName: 'Headline';
    description: '';
  };
  attributes: {
    headline: Attribute.String;
    tag: Attribute.Enumeration<['h1', 'h2', 'h3', 'h4', 'h5', 'h6']>;
  };
}

export interface CmsHero extends Schema.Component {
  collectionName: 'components_cms_heroes';
  info: {
    displayName: 'Hero';
    description: '';
  };
  attributes: {
    img: Attribute.Media;
    button: Attribute.Component<'cms.button'>;
    vh: Attribute.Enumeration<['vh-25', 'vh-50', 'vh-75', 'vh-100']>;
    content: Attribute.Blocks;
  };
}

export interface CmsList extends Schema.Component {
  collectionName: 'components_cms_lists';
  info: {
    displayName: 'list';
    description: '';
  };
  attributes: {
    List: Attribute.Component<'items.list-items', true>;
  };
}

export interface CmsMap extends Schema.Component {
  collectionName: 'components_cms_maps';
  info: {
    displayName: 'Map';
  };
  attributes: {
    Iframe: Attribute.String;
  };
}

export interface CmsMargin extends Schema.Component {
  collectionName: 'components_cms_margins';
  info: {
    displayName: 'Margin';
    description: '';
  };
  attributes: {
    mb: Attribute.Enumeration<
      [
        'mb-static-15',
        'mb-static-20',
        'mb-static-30',
        'mb-static-45',
        'mb-static-50'
      ]
    >;
    pt: Attribute.Enumeration<
      [
        'pt-static-15',
        'pt-static-20',
        'pt-static-30',
        'pt-static-45',
        'pt-static-50'
      ]
    >;
    pb: Attribute.Enumeration<
      [
        'pb-static-15',
        'pb-static-20',
        'pb-static-30',
        'pb-static-45',
        'pb-static-50'
      ]
    >;
    mt: Attribute.Enumeration<
      [
        'mt-static-15',
        'mt-static-20',
        'mt-static-30',
        'mt-static-45',
        'mt-static-50'
      ]
    >;
  };
}

export interface CmsModal extends Schema.Component {
  collectionName: 'components_cms_modals';
  info: {
    displayName: 'Modal';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.Text;
    button: Attribute.Component<'cms.button'>;
  };
}

export interface CmsPostCategory extends Schema.Component {
  collectionName: 'components_cms_post_categories';
  info: {
    displayName: 'PostCategory';
    description: '';
  };
  attributes: {
    category: Attribute.Component<'items.post-category-list'>;
  };
}

export interface CmsPresale extends Schema.Component {
  collectionName: 'components_cms_presales';
  info: {
    displayName: 'Presale';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface CmsRating extends Schema.Component {
  collectionName: 'components_cms_ratings';
  info: {
    displayName: 'Rating';
    description: '';
  };
  attributes: {
    communityRating: Attribute.Integer;
    vertrauenRating: Attribute.Integer;
    markttrendRating: Attribute.Integer;
  };
}

export interface CmsScreener extends Schema.Component {
  collectionName: 'components_cms_screeners';
  info: {
    displayName: 'Screener';
    description: '';
  };
  attributes: {
    theme: Attribute.String;
    height: Attribute.String;
  };
}

export interface CmsSocial extends Schema.Component {
  collectionName: 'components_cms_socials';
  info: {
    displayName: 'Social';
    description: '';
  };
  attributes: {
    x: Attribute.String;
    dex: Attribute.String;
    page: Attribute.String;
  };
}

export interface CmsUpdate extends Schema.Component {
  collectionName: 'components_cms_updates';
  info: {
    displayName: 'Update';
  };
  attributes: {
    date: Attribute.Date;
  };
}

export interface CmsVHero extends Schema.Component {
  collectionName: 'components_cms_v_heroes';
  info: {
    displayName: 'VHero';
    description: '';
  };
  attributes: {
    file: Attribute.Media;
    mask: Attribute.Media;
    vh: Attribute.Enumeration<['vh-25', 'vh-50', 'vh-75', 'vh-100']>;
    button: Attribute.Component<'cms.button'>;
    content: Attribute.Blocks;
  };
}

export interface ItemsAccordionItems extends Schema.Component {
  collectionName: 'components_cms_accordion_items';
  info: {
    displayName: 'AccordionItems';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.Blocks;
  };
}

export interface ItemsCarouselItems extends Schema.Component {
  collectionName: 'components_items_carousel_items';
  info: {
    displayName: 'CarouselItems';
    description: '';
  };
  attributes: {
    img: Attribute.Media;
    headline: Attribute.String;
    content: Attribute.String;
  };
}

export interface ItemsListItems extends Schema.Component {
  collectionName: 'components_cms_list_items';
  info: {
    displayName: 'ListItems';
    description: '';
  };
  attributes: {
    content: Attribute.Text;
  };
}

export interface ItemsNavItems extends Schema.Component {
  collectionName: 'components_items_nav_items';
  info: {
    displayName: 'NavItems';
  };
  attributes: {
    title: Attribute.String;
    link: Attribute.String;
    page: Attribute.Relation<'items.nav-items', 'oneToOne', 'api::page.page'>;
  };
}

export interface ItemsPostCategoryList extends Schema.Component {
  collectionName: 'components_items_post_category_lists';
  info: {
    displayName: 'PostCategoryList';
    description: '';
  };
  attributes: {
    categoryList: Attribute.Enumeration<
      ['memeCoin', 'memeNews', 'memePresale']
    >;
  };
}

export interface MetaSeo extends Schema.Component {
  collectionName: 'components_meta_seos';
  info: {
    displayName: 'SEO';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    ogImage: Attribute.Media;
  };
}

export interface NavNav extends Schema.Component {
  collectionName: 'components_nav_navs';
  info: {
    displayName: 'Nav';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    link: Attribute.String;
    page: Attribute.Relation<'nav.nav', 'oneToOne', 'api::page.page'>;
    submenu: Attribute.Component<'items.nav-items', true>;
    hidden: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'cms.accordion': CmsAccordion;
      'cms.button': CmsButton;
      'cms.carousel': CmsCarousel;
      'cms.coin-chart': CmsCoinChart;
      'cms.collection': CmsCollection;
      'cms.content-image': CmsContentImage;
      'cms.content': CmsContent;
      'cms.disclaimer': CmsDisclaimer;
      'cms.headline': CmsHeadline;
      'cms.hero': CmsHero;
      'cms.list': CmsList;
      'cms.map': CmsMap;
      'cms.margin': CmsMargin;
      'cms.modal': CmsModal;
      'cms.post-category': CmsPostCategory;
      'cms.presale': CmsPresale;
      'cms.rating': CmsRating;
      'cms.screener': CmsScreener;
      'cms.social': CmsSocial;
      'cms.update': CmsUpdate;
      'cms.v-hero': CmsVHero;
      'items.accordion-items': ItemsAccordionItems;
      'items.carousel-items': ItemsCarouselItems;
      'items.list-items': ItemsListItems;
      'items.nav-items': ItemsNavItems;
      'items.post-category-list': ItemsPostCategoryList;
      'meta.seo': MetaSeo;
      'nav.nav': NavNav;
    }
  }
}
