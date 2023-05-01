import { environment } from "src/environments/environment";

export class ServiceConstants {
  public static DOMAIN = `${environment.API_URL_MAFIC}`;
  public static PAYTM_DOMAIN = 'pguat.paytm.com';
}

export class APIUrls {
  public static FETCH_CATEGORY_DETAILS           = ServiceConstants.DOMAIN + '/api/Mafic/getProductCategoryCount';
  public static FETCH_PRODUCT_LIST               = ServiceConstants.DOMAIN + '/api/MaficDashboard/getProductData';
  public static FETCH_PRODUCT_LIST_CATEGORY      = ServiceConstants.DOMAIN + '/api/Mafic/getAllCategoryProduct';
  public static FETCH_SINGLE_PRODUCT_DETAILS     = ServiceConstants.DOMAIN + '/api/Mafic/getSingleProductData';
  public static FETCH_ABOUT_SEC_TWO              = ServiceConstants.DOMAIN + '/api/MaficDashboard/aboutUs/getAboutSectionTwo';
  public static FETCH_ABOUT_SEC_THREE            = ServiceConstants.DOMAIN + '/api/MaficDashboard/aboutUs/getAboutSectionThree';
  public static FETCH_ABOUT_SEC_FOUR             = ServiceConstants.DOMAIN + '/api/MaficDashboard/aboutUs/getAboutSectionFour';
  public static FETCH_ABOUT_SEC_FIVE             = ServiceConstants.DOMAIN + '/api/MaficDashboard/aboutUs/getAboutSectionFive';
  public static FETCH_ABOUT_SEC_SIX              = ServiceConstants.DOMAIN + '/api/MaficDashboard/aboutUs/getAboutSectionSix';
  public static FETCH_CONTACT_US                 = ServiceConstants.DOMAIN + '/api/MaficDashboard/getContactUs';
  public static SET_USER_QUERIES                 = ServiceConstants.DOMAIN + '/api/Mafic/userQueries';
  public static SET_CHNG_PASSWORD                = ServiceConstants.DOMAIN + '/api/Mafic/changePassword';
  public static FETCH_PRIVACY_POLICY             = ServiceConstants.DOMAIN + '/api/MaficDashboard/getPrivacyPolicy';
  public static FETCH_TERMS_ND_CONDITION         = ServiceConstants.DOMAIN + '/api/MaficDashboard/getTermsAndConditions';
  public static SET_PROFILE_DETAILS              = ServiceConstants.DOMAIN + '/api/Mafic/editProfile';
  public static FETCH_USER_JOIN                  = ServiceConstants.DOMAIN + '/api/Mafic/UserJoinEventList';
  public static FETCH_JOIN_EVENT                 = ServiceConstants.DOMAIN + '/api/Mafic/contestJoinCheck';
  public static FETCH_PAYPAL_ORDER_ID            = ServiceConstants.DOMAIN + '/api/Mafic/getPaypalOrderId';
  public static FETCH_PAYPAL_SKU_ORDER_ID        = ServiceConstants.DOMAIN + '/api/Mafic/getSkuPaypalOrderId';
  public static FETCH_PAYTM_SKU_ORDER_ID         = ServiceConstants.DOMAIN + '/api/Mafic/getSkuPaytmOrderId';
  public static FETCH_PAYPAL_PRODUCT_ORDER_ID    = ServiceConstants.DOMAIN + '/api/Mafic/getMarketPaypalOrderId';
  public static FETCH_PAYPAL_CART_ORDER_ID       = ServiceConstants.DOMAIN + '/api/Mafic/getCheckoutPaypalOrderId';
  public static FETCH_CHECKSUM_HASH              = ServiceConstants.DOMAIN + '/api/Mafic/getSkuCheckSum';
  public static FETCH_EVENT_CHECKSUM_HASH        = ServiceConstants.DOMAIN + '/api/Mafic/getContestCheckSum';
  public static FETCH_PRODUCT_CHECKSUM_HASH      = ServiceConstants.DOMAIN + '/api/Mafic/getMarketPlaceCheckSum';
  public static FETCH_TRANSACTION_STATUS         = ServiceConstants.DOMAIN + '/api/Mafic/paypalPaymentStatus';
  public static FETCH_MARKET_TRANSACTION_STATUS  = ServiceConstants.DOMAIN + '/api/Mafic/marketPaymentStatus';
  public static FETCH_SKU_PAYMENT_STATUS         = ServiceConstants.DOMAIN + '/api/Mafic/skuPaymentStatus';
  public static FETCH_SKU_TRANSACTION_STATUS     = ServiceConstants.DOMAIN + '/api/Mafic/skuTransactionStatus';
  public static FETCH_SOCIAL_LOGIN_DETAILS       = ServiceConstants.DOMAIN + '/api/Mafic/socialLogin';
  //public static FETCH_MAFIC_LOGO                 = ServiceConstants.DOMAIN + '/api/MaficDashboard/getLogo';
  //public static FETCH_HEADER_IMAGES              = ServiceConstants.DOMAIN + '/api/MaficDashboard/getHeaderImages';
  public static SET_GALLERY_LIKE                 = ServiceConstants.DOMAIN + '/api/Mafic/galleryLike';
  public static SET_ADDRESS_DETAILS              = ServiceConstants.DOMAIN + '/api/Mafic/addContestInvoiceAddress';
  public static SET_SKU_ADDRESS_DETAILS          = ServiceConstants.DOMAIN + '/api/Mafic/addSkuInvoiceAddress';
  public static SET_PRODUCT_ADDRESS_DETAILS      = ServiceConstants.DOMAIN + '/api/Mafic/addMarketPlaceAddress';
  public static FETCH_ADDRESS_DETAILS            = ServiceConstants.DOMAIN + '/api/Mafic/getContestInvoiceAddress';
  public static FETCH_SKU_ADDRESS_DETAILS        = ServiceConstants.DOMAIN + '/api/Mafic/getSkuInvoiceAddress';
  public static FETCH_PRODUCT_ADDRESS_DETAILS    = ServiceConstants.DOMAIN + '/api/Mafic/getMarketPlaceAddress';
  public static FETCH_WINNER_OF_EVENT            = ServiceConstants.DOMAIN + '/api/MaficDashboard/getwinnerAssign';
  public static FETCH_WINNER_DETAILS             = ServiceConstants.DOMAIN + '/api/MaficDashboard/getWinnerUser';
  public static FETCH_INVOICE_DETAILS            = ServiceConstants.DOMAIN + '/api/Mafic/getAllInvoiceDetails';
  public static FETCH_SKU_SUB_DETAILS            = ServiceConstants.DOMAIN + '/api/Mafic/getSkuSubscription';
  public static FETCH_USER_WINNER_DETAILS        = ServiceConstants.DOMAIN + '/api/Mafic/getProfileWinnerData';
  public static FETCH_STATE_DETAILS              = ServiceConstants.DOMAIN + '/api/MaficDashboard/getStates';
  public static FETCH_MARKET_DETAILS             = ServiceConstants.DOMAIN + '/api/Mafic/getEcommerceData';
  public static FETCH_MARKET_DETAIL              = ServiceConstants.DOMAIN + '/api/Mafic/getSingleEcommerceData';
  public static SET_MARKET_DETAILS_TO_CART       = ServiceConstants.DOMAIN + '/api/Mafic/addToCart';
  public static FETCH_MARKET_DETAILS_OF_CART     = ServiceConstants.DOMAIN + '/api/Mafic/getCartList';
  public static FETCH_COUNT_OF_CART              = ServiceConstants.DOMAIN + '/api/Mafic/countAddToCartData';
  //public static FETCH_HEADER_DETAILS             = ServiceConstants.DOMAIN + '/api/MaficDashboard/getHeaderDetails';
  public static FETCH_CLIENT_DETAILS             = ServiceConstants.DOMAIN + '/api/MaficDashboard/getClientRequest';
  public static FETCH_LOGIN_DETAILS              = ServiceConstants.DOMAIN + '/api/Mafic/login';
  public static FORGOT_PASSWORD                  = ServiceConstants.DOMAIN + '/api/Mafic/forgetPassword';
  public static FETCH_FRESH_ARRIVALS             = ServiceConstants.DOMAIN + '/api/Mafic/getNewArrivalProducts';
  public static SET_MARKET_DETAILS_TO_WISHLIST   = ServiceConstants.DOMAIN + '/api/Mafic/addWishList';
  public static FETCH_MARKET_DETAILS_OF_WISHLIST = ServiceConstants.DOMAIN + '/api/Mafic/getWishList';
  public static DELETE_FROM_WISHLIST             = ServiceConstants.DOMAIN + '/api/Mafic/deleteWishList';
  public static DELETE_FROM_CART                 = ServiceConstants.DOMAIN + '/api/Mafic/deleteCartList';
  public static INCREMENT_CART_ITEM              = ServiceConstants.DOMAIN + '/api/Mafic/incrementQuantity';
  public static DECREMENT_CART_ITEM              = ServiceConstants.DOMAIN + '/api/Mafic/decrementQuantity';
  public static SEARCH_ITEM                      = ServiceConstants.DOMAIN + '/api/Mafic/productsSearch';
  public static FETCH_ORDER_DETAILS              = ServiceConstants.DOMAIN + '/api/Mafic/productOrderDetails';
  public static FETCH_PRODUCT_NAME               = ServiceConstants.DOMAIN + '/api/Mafic/getProductName';
}

export class paytm {
  public static PAYTM_ENVIRONMENT                = 'TEST';
  public static PAYTM_MERCHANT_KEY               = 'lq01trHbOFKmtoQA';
  public static PAYTM_MERCHANT_MID               = 'TheMaf76965527860641';
  public static PAYTM_MERCHANT_WEBSITE           = 'DEFAULT';
  public static INDUSTRY_TYPE_ID                 = 'ECommerce';
  public static CHANNEL_ID                       = 'WEB';
  public static PAYTM_REFUND_URL                 = 'https://' + ServiceConstants.PAYTM_DOMAIN + '/oltp/HANDLER_INTERNAL/REFUND';
  public static PAYTM_TXN_URL                    = 'https://' + ServiceConstants.PAYTM_DOMAIN + '/theia/processTransaction';
  public static PAYTM_TXN_STATUS_URL             = 'https://' + ServiceConstants.PAYTM_DOMAIN + '/merchant-status/getTxnStatus';
  public static TEMP_RESP                        = `${environment.API_URL_MAFIC}/about-us/`;
}
