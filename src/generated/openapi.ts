/**
 * Bu dosya api/openapi.yaml'dan sdk/scripts/generate-server-sdks.mjs ile üretilmiştir; elle düzenlemeyin.
 * Üretici: openapi-typescript.
 */

export interface paths {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Servis bilgisi */
        get: operations["HealthController_root"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/status.json": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Status page (bileşenler ve açık olaylar) */
        get: operations["HealthController_statusPage"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/healthz": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Liveness: süreç ayakta mı? */
        get: operations["HealthController_healthz"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/readyz": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Readiness: veritabanı ve Redis erişilebilir mi? */
        get: operations["HealthController_readyz"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/api-keys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** App'e bağlı API anahtarları */
        get: operations["PublicApiKeysController_list"];
        put?: never;
        /** App'e bağlı API anahtarı oluştur (ham anahtar yalnızca bu yanıtta) */
        post: operations["PublicApiKeysController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/api-keys/{keyId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Anahtarı iptal et */
        delete: operations["PublicApiKeysController_revoke"];
        options?: never;
        head?: never;
        /** Anahtarı güncelle (ad, kapsam, IP izin listesi, bitiş) */
        patch: operations["PublicApiKeysController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/api-keys/{keyId}/rotate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Anahtarı döndür (eski değer anında geçersiz) */
        post: operations["PublicApiKeysController_rotate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/identity-keys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** SDK kimlik doğrulama (JWT) genel anahtarları */
        get: operations["PublicIdentityKeysController_list"];
        put?: never;
        /**
         * Genel anahtar ekle (ES256)
         * @description SDK JWT identity verification için ES256 (EC P-256) genel anahtarı ekler; özel anahtar gönderilmez. Belirteç sunucunuzda imzalanır (`sub` = external_id, `aud` = app_id, `exp` ≤ 24 saat) ve SDK isteklerinde `Authorization: Bearer <jwt>` başlığıyla taşınır. Kip app ayarında `identity_verification_mode` ile seçilir.
         */
        post: operations["PublicIdentityKeysController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/identity-keys/{keyId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Genel anahtarı iptal et */
        delete: operations["PublicIdentityKeysController_revoke"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/config": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** SDK için public app yapılandırması */
        get: operations["SdkController_config"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/subscriptions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cihaz/kanal kaydı (idempotent: aynı token tek abonelik) */
        post: operations["SdkController_register"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/subscriptions/{subscriptionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Aboneliği sil (sahiplik kanıtı: token_hash veya identity_hash)
         * @description Kanıt kuralları PATCH ile aynıdır (ADR-0016).
         */
        delete: operations["SdkController_removeSubscription"];
        options?: never;
        head?: never;
        /**
         * Token yenileme, cihaz bilgisi, opt-in/out (sahiplik kanıtı: token_hash veya identity_hash)
         * @description Kanıt, kayıtlı token'ın SHA-256 özeti (`token_hash`) veya abonelik kullanıcısının `identity_hash`'idir. Push aboneliğinde `ownership_proof: true` ile kaydolmuş ya da bir kez geçerli kanıt göndermiş abonelikte zorunludur; e-posta/SMS aboneliğinde her zaman zorunludur. Yanlış kanıt 403 (ADR-0016).
         */
        patch: operations["SdkController_patchSubscription"];
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/subscriptions/{subscriptionId}/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Cihazı external_id ile kullanıcıya bağla (anonim kullanıcı birleştirilir; sahiplik kanıtı: token_hash)
         * @description Sahiplik kanıtı `token_hash` (kayıtlı token'ın SHA-256 özeti); `identity_hash` yalnızca abonelik zaten aynı `external_id` ile bağlıysa kanıt sayılır. Kurallar PATCH ile aynıdır (ADR-0016).
         */
        post: operations["SdkController_login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/subscriptions/{subscriptionId}/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Cihazı anonim yeni kullanıcıya taşı (sahiplik kanıtı: token_hash veya identity_hash)
         * @description Kanıt kuralları PATCH ile aynıdır (ADR-0016); gövde boş gönderilebilir.
         */
        post: operations["SdkController_logout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/users/{userId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Tag/property merge-patch (identity verification zorunluysa hash gerekir) */
        patch: operations["SdkController_patchUser"];
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/users/{userId}/identity": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Kullanıcıya alias ekle (User.addAlias; identity verification zorunluysa hash) */
        patch: operations["SdkController_addIdentity"];
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/users/{userId}/identity/{label}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Kullanıcıdan alias kaldır (User.removeAlias) */
        delete: operations["SdkController_removeIdentity"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/sessions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Oturum başlangıcı (süre yoksa) veya bitişi (süre ile; sahiplik kanıtı: token_hash veya identity_hash)
         * @description `subscription_id` aboneliği için kanıt kuralları PATCH ile aynıdır (ADR-0016).
         */
        post: operations["SdkController_session"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Toplu olay bildirimi (en fazla 100) */
        post: operations["SdkController_events"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/deliveries/{deliveryId}/received": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cihaz bildirimi aldı (confirmed delivery) */
        post: operations["SdkDeliveriesController_received"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/deliveries/{deliveryId}/dismissed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Bildirim kullanıcı tarafından kapatıldı (web notificationclose, Android silme) */
        post: operations["SdkDeliveriesController_dismissed"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/deliveries/{deliveryId}/opened": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Bildirim açıldı / düğmeye tıklandı */
        post: operations["SdkDeliveriesController_opened"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/live-activities/types": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Live Activity türleri */
        get: operations["PublicLiveActivitiesController_listTypes"];
        put?: never;
        /** Live Activity türü oluştur */
        post: operations["PublicLiveActivitiesController_createType"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/live-activities/types/{activityType}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Live Activity türünü sil */
        delete: operations["PublicLiveActivitiesController_deleteType"];
        options?: never;
        head?: never;
        /** Live Activity türünü güncelle */
        patch: operations["PublicLiveActivitiesController_updateType"];
        trace?: never;
    };
    "/v1/apps/{appId}/live-activities/{activityType}/start": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Live Activity başlat (push-to-start)
         * @description Hedefteki iOS aboneliklerinin push-to-start belirteçleriyle etkinliği uzaktan başlatır (iOS 17.2+). `attributes` ve `content_state` türün şemasına uymalıdır. Dönen `activity_id` ile sonraki update/end yapılır.
         */
        post: operations["PublicLiveActivitiesController_start"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/live-activities/{activityType}/update": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Live Activity güncelle
         * @description Etkinliğin cihazlardan bildirilen güncelleme belirteçlerine yeni içerik durumu gönderir. Sessiz saat ve frekans sınırı uygulanmaz; priority 5 Apple bütçesini korur.
         */
        post: operations["PublicLiveActivitiesController_update"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/live-activities/{activityType}/end": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Live Activity bitir */
        post: operations["PublicLiveActivitiesController_end"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/live-activities/tokens": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Live Activity belirteci kaydet (push-to-start veya etkinlik güncelleme) */
        post: operations["SdkLiveActivitiesController_registerToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/live-activities/tokens/delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Live Activity belirtecini sil (etkinlik bitti veya izin kaldırıldı) */
        post: operations["SdkLiveActivitiesController_deleteToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/data-feeds": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Data feed listesi */
        get: operations["PublicDynamicContentController_listFeeds"];
        put?: never;
        /**
         * Data feed oluştur
         * @description URL şablonu Liquid ile kişiselleştirilir (ör. `https://api.ornek.com/u/{{ user.external_id }}`); şablonda `{{ feed.<ad>.alan }}`.
         */
        post: operations["PublicDynamicContentController_createFeed"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/data-feeds/{feedId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Data feed ayrıntısı */
        get: operations["PublicDynamicContentController_getFeed"];
        put?: never;
        post?: never;
        /** Data feed sil */
        delete: operations["PublicDynamicContentController_deleteFeed"];
        options?: never;
        head?: never;
        /** Data feed güncelle */
        patch: operations["PublicDynamicContentController_updateFeed"];
        trace?: never;
    };
    "/v1/apps/{appId}/data-feeds/{feedId}/test": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Data feed'i örnek kullanıcıyla dene */
        post: operations["PublicDynamicContentController_testFeed"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/content-tables": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** İçerik tabloları */
        get: operations["PublicDynamicContentController_listTables"];
        put?: never;
        /**
         * CSV ile içerik tablosu oluştur
         * @description Şablonda `{% lookup '<ad>' key: user.tags.<etiket> as satir %}{{ satir.<sütun> }}`.
         */
        post: operations["PublicDynamicContentController_createTableUpload"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/content-tables/{tableId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** İçerik tablosu ayrıntısı */
        get: operations["PublicDynamicContentController_getTable"];
        put?: never;
        post?: never;
        /** İçerik tablosunu sil */
        delete: operations["PublicDynamicContentController_deleteTable"];
        options?: never;
        head?: never;
        /** İçerik tablosu açıklamasını güncelle */
        patch: operations["PublicDynamicContentController_updateTable"];
        trace?: never;
    };
    "/v1/apps/{appId}/content-tables/{tableId}/rows": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** İçerik tablosu satırları */
        get: operations["PublicDynamicContentController_tableRows"];
        /** İçerik tablosunu yeniden yükle (sürüm artar) */
        put: operations["PublicDynamicContentController_replaceTableUpload"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/errors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** SDK hata raporları (en fazla 20; 7 gün saklanır) */
        post: operations["SdkErrorsIngestController_ingest"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/webhooks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Webhook endpoint'leri */
        get: operations["PublicWebhooksController_list"];
        put?: never;
        /** Endpoint oluştur (secret yalnızca bu yanıtta döner) */
        post: operations["PublicWebhooksController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/webhooks/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Event Streams önizlemesi: örnek olay + şablon + filtre → gövde/hata (gönderim yapmaz) */
        post: operations["PublicWebhooksController_preview"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/webhooks/{webhookId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Endpoint detayı */
        get: operations["PublicWebhooksController_get"];
        put?: never;
        post?: never;
        /** Endpoint sil */
        delete: operations["PublicWebhooksController_remove"];
        options?: never;
        head?: never;
        /** Endpoint güncelle (URL, olaylar, batch, başlıklar, etkinleştir/durdur) */
        patch: operations["PublicWebhooksController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/webhooks/{webhookId}/rotate-secret": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Secret rotasyonu (eski secret 24 saat ikinci imza olarak gönderilir) */
        post: operations["PublicWebhooksController_rotate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/webhooks/{webhookId}/test": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Test olayı gönder (anında, sonuç döner) */
        post: operations["PublicWebhooksController_test"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/webhooks/{webhookId}/deliveries": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Teslim geçmişi (cursor; durum/olay türü filtresi) */
        get: operations["PublicWebhooksController_deliveries"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/webhooks/deliveries/{deliveryId}/replay": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Teslimi yeniden gönder (aynı olay kimliğiyle) */
        post: operations["PublicWebhooksController_replay"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/warehouse-exports/tables": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Dışa aktarılabilir tablolar, kolonlar ve şema sürümleri */
        get: operations["PublicWarehouseController_tables"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/warehouse-exports/test-connection": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Kaydetmeden bağlantı testi */
        post: operations["PublicWarehouseController_test"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/warehouse-exports": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Veri ambarı dışa aktarımları */
        get: operations["PublicWarehouseController_list"];
        put?: never;
        /** Dışa aktarım oluştur (kimlik bilgisi şifreli saklanır, yanıtta dönmez) */
        post: operations["PublicWarehouseController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/warehouse-exports/{exportId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Dışa aktarım detayı */
        get: operations["PublicWarehouseController_get"];
        put?: never;
        post?: never;
        /** Dışa aktarımı sil (hedefteki veriler silinmez) */
        delete: operations["PublicWarehouseController_remove"];
        options?: never;
        head?: never;
        /** Dışa aktarımı güncelle (ad, tablolar, zamanlama, etkin/duraklat, hedef ayarı, kimlik bilgisi) */
        patch: operations["PublicWarehouseController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/warehouse-exports/{exportId}/test": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Kayıtlı dışa aktarımın bağlantı testi */
        post: operations["PublicWarehouseController_testSaved"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/warehouse-exports/{exportId}/run": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Şimdi çalıştır (son başarılı imleçten itibaren) */
        post: operations["PublicWarehouseController_run"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/warehouse-exports/{exportId}/runs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Çalıştırma geçmişi (cursor) */
        get: operations["PublicWarehouseController_runs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/organization": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Anahtarın ait olduğu organizasyon (org geneli admin anahtarı) */
        get: operations["PublicApiController_organization"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/organization/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Organizasyon üyeleri (org geneli admin anahtarı) */
        get: operations["PublicApiController_members"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/organization/audit-logs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Audit log (org geneli admin anahtarı; action/actor/app/tarih filtreleri, cursor) */
        get: operations["PublicApiController_auditLogs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** App listesi (org geneli admin anahtarı) */
        get: operations["PublicApiController_list"];
        put?: never;
        /** App oluştur (org geneli admin anahtarı) */
        post: operations["PublicApiController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** App detayı */
        get: operations["PublicApiController_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** App ayarlarını güncelle */
        patch: operations["PublicApiController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kullanıcı listesi */
        get: operations["PublicUsersController_list"];
        put?: never;
        /** Kullanıcı oluştur/güncelle (external_id ile, isteğe bağlı aboneliklerle) */
        post: operations["PublicUsersController_upsert"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/users/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Segment tanımı ile kullanıcı arama */
        post: operations["PublicUsersController_search"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/users/by/{label}/{value}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Alias ile kullanıcı (hs_id, external_id veya özel etiket) */
        get: operations["PublicUsersController_getByAlias"];
        put?: never;
        post?: never;
        /** Kullanıcıyı sil (abonelikler silinir, olaylar anonimleşir) */
        delete: operations["PublicUsersController_deleteByAlias"];
        options?: never;
        head?: never;
        /** Tag/property merge-patch ve deltas */
        patch: operations["PublicUsersController_patchByAlias"];
        trace?: never;
    };
    "/v1/apps/{appId}/users/by/{label}/{value}/identity": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kullanıcının tüm kimlikleri (hs_id, external_id, özel alias'lar) */
        get: operations["PublicUsersController_getIdentity"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Alias ekle */
        patch: operations["PublicUsersController_addAlias"];
        trace?: never;
    };
    "/v1/apps/{appId}/users/by/{label}/{value}/export": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kullanıcı verisini dışa aktar (KVKK/GDPR taşınabilirlik): profil, alias, abonelik, son olaylar */
        get: operations["PublicUsersController_exportUser"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/users/by/{label}/{value}/identity/{aliasLabel}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Alias kaldır */
        delete: operations["PublicUsersController_removeAlias"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/users/by/{label}/{value}/subscriptions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Kullanıcıya abonelik ekle */
        post: operations["PublicUsersController_addSubscription"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/subscriptions/{subscriptionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Abonelik detayı */
        get: operations["PublicUsersController_getSubscription"];
        put?: never;
        post?: never;
        /** Aboneliği sil */
        delete: operations["PublicUsersController_deleteSubscription"];
        options?: never;
        head?: never;
        /** Abonelik güncelle */
        patch: operations["PublicUsersController_patchSubscription"];
        trace?: never;
    };
    "/v1/apps/{appId}/subscriptions/{subscriptionId}/user/identity": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Aboneliğin sahibi kullanıcının kimlikleri */
        get: operations["PublicUsersController_getSubscriptionIdentity"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/subscriptions_by_token/{tokenType}/{token}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Token ile abonelik güncelle (token_type: ios_push, android_push, hms_push, web_push, email, sms veya OneSignal adları iOSPush, AndroidPush, HuaweiPush, ChromePush, FirefoxPush, SafariPush, Email, SMS) */
        patch: operations["PublicUsersController_patchSubscriptionByToken"];
        trace?: never;
    };
    "/v1/apps/{appId}/subscriptions/{subscriptionId}/owner": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Aboneliği external_id ile kullanıcıya bağla */
        post: operations["PublicUsersController_setOwner"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Toplu olay gönder (en fazla 500) */
        post: operations["PublicUsersController_events"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/channels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kanal yapılandırmaları */
        get: operations["PublicChannelsController_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/channels/{channel}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Kimlik bilgisi yükle (APNs p8, FCM servis hesabı, VAPID, mock) */
        put: operations["PublicChannelsController_upsert"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/channels/{channel}/validate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Sağlayıcıya test bağlantısı */
        post: operations["PublicChannelsController_validate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/notifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Mesaj listesi (app_id zorunlu) */
        get: operations["PublicNotificationsController_list"];
        put?: never;
        /** Bildirim oluştur (202, asenkron teslimat) */
        post: operations["PublicNotificationsController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/notifications/estimate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Kaydedilmemiş hedef için alıcı sayısı (gönderim yapmaz) */
        post: operations["PublicNotificationsController_estimate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/notifications/{messageId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Mesaj durumu ve sayaçları */
        get: operations["PublicNotificationsController_get"];
        put?: never;
        post?: never;
        /** Zamanlanmış/kuyruktaki mesajı iptal et */
        delete: operations["PublicNotificationsController_cancel"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/notifications/{messageId}/deliveries": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Abone bazlı teslimat sonuçları (cursor) */
        get: operations["PublicNotificationsController_deliveries"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/analytics/overview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Genel bakış KPI */
        get: operations["PublicAnalyticsController_overview"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/analytics/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Teslimat raporu */
        get: operations["PublicAnalyticsController_messagesReport"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/analytics/subscriptions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Abonelik büyümesi */
        get: operations["PublicAnalyticsController_subscriptionsReport"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/analytics/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Olay hacmi */
        get: operations["PublicAnalyticsController_eventsReport"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/analytics/conversions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Dönüşüm/atribüsyon */
        get: operations["PublicAnalyticsController_conversionsReport"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/analytics/funnels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Funnel */
        post: operations["PublicAnalyticsController_funnelReport"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/analytics/providers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Sağlayıcı sağlığı */
        get: operations["PublicAnalyticsController_providersReport"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/analytics/retention": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Retention kohortu */
        get: operations["PublicAnalyticsController_retentionReport"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/analytics/engagement": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Etkileşim ısı haritası */
        get: operations["PublicAnalyticsController_engagementReport"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/events/definitions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Olay tanımları */
        get: operations["PublicEventsController_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/events/definitions/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Olay detayı */
        get: operations["PublicEventsController_detail"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Görünen ad / dönüşüm işareti */
        patch: operations["PublicEventsController_patch"];
        trace?: never;
    };
    "/v1/apps/{appId}/exports": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Export işleri */
        get: operations["PublicDataTransferController_listExports"];
        put?: never;
        /** Export işi başlat */
        post: operations["PublicDataTransferController_createExport"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/exports/{exportId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Export durumu (download_url) */
        get: operations["PublicDataTransferController_getExport"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/imports": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Import işleri */
        get: operations["PublicDataTransferController_listImports"];
        put?: never;
        /** Import işi başlat (multipart: type, file) */
        post: operations["PublicDataTransferController_createImport"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/imports/{importId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Import durumu */
        get: operations["PublicDataTransferController_getImport"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/notifications/{messageId}/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Bildirim geçmişi CSV işi (teslimatlar; tamamlanınca download_url) */
        get: operations["PublicNotificationHistoryController_history"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/notifications/{messageId}/export_events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Mesaj olay CSV işi (gönderildi/teslim/açıldı/tıklandı/bounce…; tamamlanınca download_url) */
        post: operations["PublicNotificationHistoryController_exportEvents"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/segments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Segment listesi */
        get: operations["PublicSegmentsController_list"];
        put?: never;
        /** Segment oluştur */
        post: operations["PublicSegmentsController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/segments/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Tanım ile sayım ve örnek kullanıcılar */
        post: operations["PublicSegmentsController_preview"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/segments/{segmentId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Segment detayı */
        get: operations["PublicSegmentsController_get"];
        put?: never;
        post?: never;
        /** Segment sil */
        delete: operations["PublicSegmentsController_remove"];
        options?: never;
        head?: never;
        /** Segment güncelle */
        patch: operations["PublicSegmentsController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/segments/{segmentId}/campaigns": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Segmenti kullanan kampanyalar */
        get: operations["PublicSegmentsController_usedBy"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/segments/{segmentId}/estimate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Tahmini sayım */
        post: operations["PublicSegmentsController_estimate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/templates": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Şablon listesi */
        get: operations["PublicTemplatesController_list"];
        put?: never;
        /** Şablon oluştur */
        post: operations["PublicTemplatesController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/templates/{templateId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Şablon detayı */
        get: operations["PublicTemplatesController_get"];
        put?: never;
        post?: never;
        /** Şablon sil */
        delete: operations["PublicTemplatesController_remove"];
        options?: never;
        head?: never;
        /** Şablon güncelle */
        patch: operations["PublicTemplatesController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/templates/{templateId}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Şablon analitiği */
        get: operations["PublicTemplatesController_stats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/templates/{templateId}/copy_to_app": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Şablonu aynı organizasyondaki başka bir app'e kopyala */
        post: operations["PublicTemplatesController_copyToApp"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/templates/{templateId}/versions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Sürüm geçmişi */
        get: operations["PublicTemplatesController_versions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/templates/{templateId}/render": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Şablonu örnek verilerle render et */
        post: operations["PublicTemplatesController_render"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kampanya listesi */
        get: operations["PublicCampaignsController_list"];
        put?: never;
        /** Kampanya oluştur */
        post: operations["PublicCampaignsController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kampanya detayı */
        get: operations["PublicCampaignsController_get"];
        put?: never;
        post?: never;
        /** Kampanya sil */
        delete: operations["PublicCampaignsController_remove"];
        options?: never;
        head?: never;
        /** Kampanya güncelle */
        patch: operations["PublicCampaignsController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/schedule": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Zamanla */
        post: operations["PublicCampaignsController_schedule"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/send": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Hemen gönder */
        post: operations["PublicCampaignsController_send"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/pause": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Duraklat */
        post: operations["PublicCampaignsController_pause"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/resume": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Sürdür */
        post: operations["PublicCampaignsController_resume"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** İptal */
        post: operations["PublicCampaignsController_cancel"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/duplicate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Çoğalt */
        post: operations["PublicCampaignsController_duplicate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/approve": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Onayla */
        post: operations["PublicCampaignsController_approve"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** İstatistikler */
        get: operations["PublicCampaignsController_stats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/variants/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** A/B varyant karşılaştırması */
        get: operations["PublicCampaignsController_variantStats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/winner": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** A/B kazananını seç */
        post: operations["PublicCampaignsController_selectWinner"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/deliveries": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Abone bazlı teslimatlar */
        get: operations["PublicCampaignsController_deliveries"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/resend-failed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Başarısız teslimatlara yeniden gönder */
        post: operations["PublicCampaignsController_resendFailed"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/campaigns/{campaignId}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kampanya çalıştırmaları */
        get: operations["PublicCampaignsController_messages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/conversations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Konuşmalar (SMS, WhatsApp, RCS, e-posta, canlı sohbet; son mesaja göre; kanal/durum/okunmamış/atanan/takım/kişi filtresi) */
        get: operations["PublicConversationsController_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/conversations/{conversationId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Konuşma (atama, SLA, bot durumu, WhatsApp oturum penceresi ve açık rıza dahil) */
        get: operations["PublicConversationsController_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Konuşma durumu: open / pending / resolved (closed = resolved) */
        patch: operations["PublicConversationsController_setStatus"];
        trace?: never;
    };
    "/v1/apps/{appId}/conversations/{conversationId}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Konuşma mesajları (yeniden eskiye; `after_seq` ile eskiden yeniye; giden mesaj durumu teslimattan veya okundu işaretçisinden) */
        get: operations["PublicConversationsController_messages"];
        put?: never;
        /** Yanıt gönder (client_message_id ile tekilleşir). Sohbet: doğrudan; e-posta: yanıt adresli işlemsel e-posta; WhatsApp: açık rıza zorunlu, son gelen mesajdan 24 saat içinde metin/medya, pencere dışında yalnızca onaylı şablon (aksi 422 WHATSAPP_WINDOW_CLOSED). */
        post: operations["PublicConversationsController_reply"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/conversations/{conversationId}/read": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Gelen mesajları okundu işaretle (sohbette ziyaretçiye okundu bilgisi gider) */
        post: operations["PublicConversationsController_read"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/conversations/{conversationId}/assign": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Konuşmayı temsilciye ve/veya takıma ata (inbox.manage olmadan yalnızca kendine) */
        post: operations["PublicConversationsController_assign"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/conversations/{conversationId}/tags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Sohbetten kişiye etiket ekle/kaldır */
        post: operations["PublicConversationsController_tags"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/conversations/{conversationId}/activity": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Konuşma zaman çizelgesi (atama, durum, ilk yanıt, bot devri) */
        get: operations["PublicConversationsController_activity"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/sms-keywords": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** İki yönlü mesaj anahtar sözcükleri (org geneli + bu app) ve yasal (ayrılmış) sözcükler */
        get: operations["PublicConversationsController_keywords"];
        put?: never;
        /** Anahtar sözcük oluştur (tag ekle/kaldır, olay → journey tetiği, otomatik yanıt, abonelik) */
        post: operations["PublicConversationsController_createKeyword"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/sms-keywords/{keywordId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Anahtar sözcüğü sil */
        delete: operations["PublicConversationsController_deleteKeyword"];
        options?: never;
        head?: never;
        /** Anahtar sözcüğü güncelle */
        patch: operations["PublicConversationsController_updateKeyword"];
        trace?: never;
    };
    "/v1/apps/{appId}/whatsapp/templates": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** WhatsApp şablonları (Meta onay durumu ile) */
        get: operations["PublicConversationsController_templates"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/whatsapp/templates/sync": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** WhatsApp şablonlarını Meta Graph API’den senkronla */
        post: operations["PublicConversationsController_sync"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/chat/config": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Sohbet widget ayarları (renk, konum, metinler), çevrimiçi/çalışma saati durumu ve ek sınırları */
        get: operations["SdkChatController_config"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/chat/identify": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Ziyaretçiyi kullanıcıya (external_id + identity_hash/JWT) ve/veya push aboneliğine (token_hash) bağla */
        post: operations["SdkChatController_identify"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/chat/conversation": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Ziyaretçinin konuşması ve okunmamış mesaj sayısı (henüz yoksa null) */
        get: operations["SdkChatController_conversation"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/chat/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Mesajlar: after_seq ile eksikler (eskiden yeniye), before_seq ile geçmiş; sıra numaralı */
        get: operations["SdkChatController_messages"];
        put?: never;
        /** Mesaj gönder (client_message_id ile tekilleşir; ilk mesaj konuşmayı açar) */
        post: operations["SdkChatController_send"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/chat/attachments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Dosya/görsel eki gönder (multipart: file + visitor_id, visitor_token, client_message_id, text; en çok 10 MB) */
        post: operations["SdkChatController_upload"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/chat/attachments/{attachmentId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Ek dosyası (yalnızca bu ziyaretçinin konuşmasından; ?download=true ile indirme) */
        get: operations["SdkChatController_attachment"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/chat/typing": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Ziyaretçi yazıyor göstergesi (temsilcilere gerçek zamanlı) */
        post: operations["SdkChatController_typing"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/chat/ack": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Okundu / teslim alındı işaretçisi (sıra numarası; yalnızca ileri gider) */
        post: operations["SdkChatController_ack"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/chat/offline": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Çevrimdışı / çalışma saatleri dışında mesaj ve e-posta bırak */
        post: operations["SdkChatController_offline"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/chat/stream": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Sohbet canlı akışı (Server-Sent Events) */
        get: operations["SdkChatController_stream"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/canned-responses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Hazır yanıtlar */
        get: operations["PublicInboxController_canned"];
        put?: never;
        /** Hazır yanıt oluştur */
        post: operations["PublicInboxController_createCanned"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/canned-responses/{cannedId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Hazır yanıtı sil */
        delete: operations["PublicInboxController_deleteCanned"];
        options?: never;
        head?: never;
        /** Hazır yanıtı güncelle */
        patch: operations["PublicInboxController_updateCanned"];
        trace?: never;
    };
    "/v1/apps/{appId}/inbox/teams": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Takımlar */
        get: operations["PublicInboxController_teams"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/inbox/agents": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Temsilciler ve varlık durumu */
        get: operations["PublicInboxController_agents"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/inbox/settings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Gelen kutusu ayarları */
        get: operations["PublicInboxController_settings"];
        /** Gelen kutusu ayarlarını güncelle */
        put: operations["PublicInboxController_updateSettings"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/inbox/metrics": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Gelen kutusu metrikleri (ilk yanıt/çözüm ort. ve p90, SLA, temsilci tablosu) */
        get: operations["PublicInboxController_metrics"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/email-deliverability": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** E-posta teslim ayarları (BCC/arşiv, gönderim öncesi adres doğrulama, üçüncü taraf doğrulayıcı) */
        get: operations["PublicDeliverabilityController_settings"];
        /** E-posta teslim ayarlarını güncelle (doğrulayıcı anahtarı zarf şifreli saklanır, geri okunmaz) */
        put: operations["PublicDeliverabilityController_update"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/email-deliverability/verify-address": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Adres doğrulama testi (sözdizimi, MX, tek kullanımlık alan adı, rol hesabı, üçüncü taraf) */
        post: operations["PublicDeliverabilityController_verify"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/email-deliverability/warmup-plans": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Isındırma planları (bugünkü limit/kullanım ve ileri günlere ayrılmış gönderimler) */
        get: operations["PublicDeliverabilityController_plans"];
        put?: never;
        /** Isındırma planı oluştur (günlük limit eğrisi veya başlangıç/çarpan/hedef; sağlayıcı payları) */
        post: operations["PublicDeliverabilityController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/email-deliverability/warmup-plans/{planId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Isındırma planı */
        get: operations["PublicDeliverabilityController_get"];
        put?: never;
        post?: never;
        /** Isındırma planını sil */
        delete: operations["PublicDeliverabilityController_remove"];
        options?: never;
        head?: never;
        /** Isındırma planını güncelle (duraklat/sürdür, eğri, paylar) */
        patch: operations["PublicDeliverabilityController_updatePlan"];
        trace?: never;
    };
    "/v1/apps/{appId}/email-deliverability/warmup-plans/{planId}/usage": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Isındırma planı gün × sağlayıcı kullanımı */
        get: operations["PublicDeliverabilityController_usage"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/suppressions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Suppression list (e-posta/SMS gönderilmeyecek adresler; kanal/neden/değer filtresi) */
        get: operations["PublicSuppressionsController_list"];
        put?: never;
        /** Adres ekle (manuel engel; değer saklanmaz, özet + maskeli gösterim) */
        post: operations["PublicSuppressionsController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/suppressions/{suppressionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Kaydı kaldır (adres yeniden gönderim alabilir) */
        delete: operations["PublicSuppressionsController_remove"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/in-app": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Cihaz için gösterilebilecek in-app mesajlar (tetikleri SDK değerlendirir) */
        get: operations["SdkEngagementController_inAppList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/in-app/{messageId}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** In-app gösterim / tıklama / kapatma */
        post: operations["SdkEngagementController_inAppEvent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/users/{userId}/inbox": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Bildirim kutusu (abonelik kullanıcıya ait olmalı; gerekirse identity_hash) */
        get: operations["SdkEngagementController_inboxList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/users/{userId}/inbox/read-all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Tümünü okundu işaretle */
        post: operations["SdkEngagementController_inboxReadAll"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/users/{userId}/inbox/{itemId}/read": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Okundu işaretle */
        post: operations["SdkEngagementController_inboxRead"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/users/{userId}/inbox/{itemId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Kutudan kaldır (arşivle) */
        delete: operations["SdkEngagementController_inboxArchive"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/in-app-messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** In-app mesajlar (durum filtresi; istatistik dahil) */
        get: operations["PublicInAppController_list"];
        put?: never;
        /** In-app mesaj oluştur (taslak) */
        post: operations["PublicInAppController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/in-app-messages/{messageId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** In-app mesaj detayı ve istatistikleri */
        get: operations["PublicInAppController_get"];
        put?: never;
        post?: never;
        /** In-app mesajı sil */
        delete: operations["PublicInAppController_remove"];
        options?: never;
        head?: never;
        /** In-app mesajı düzenle */
        patch: operations["PublicInAppController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/in-app-messages/{messageId}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Yayınla / duraklat / arşivle */
        post: operations["PublicInAppController_status"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/in-app-messages/{messageId}/winner": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** A/B kazananını elle seç */
        post: operations["PublicInAppController_winner"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/users/by/{label}/{value}/inbox": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kullanıcının bildirim kutusu (okunmamış sayısı dahil) */
        get: operations["PublicInboxController_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/users/by/{label}/{value}/inbox/read-all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Tümünü okundu işaretle */
        post: operations["PublicInboxController_readAll"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/users/by/{label}/{value}/inbox/{itemId}/read": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Okundu işaretle */
        post: operations["PublicInboxController_read"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/users/by/{label}/{value}/inbox/{itemId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Kutudan kaldır (arşivle) */
        delete: operations["PublicInboxController_archive"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Mesaj kategorileri */
        get: operations["PublicPreferencesController_list"];
        put?: never;
        /** Kategori oluştur */
        post: operations["PublicPreferencesController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/categories/{categoryId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Kategori sil */
        delete: operations["PublicPreferencesController_remove"];
        options?: never;
        head?: never;
        /** Kategori güncelle */
        patch: operations["PublicPreferencesController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/users/by/{label}/{value}/preferences": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kullanıcının tercihleri (alias ile) */
        get: operations["PublicPreferencesController_userPreferences"];
        /** Kullanıcı tercihlerini yaz (alias ile) */
        put: operations["PublicPreferencesController_setUserPreferences"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/preferences": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Cihaz kullanıcısının tercihleri ve kategoriler */
        get: operations["SdkPreferencesController_get"];
        /** Cihaz kullanıcısının tercihlerini yaz */
        put: operations["SdkPreferencesController_set"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/organization/usage": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Organizasyon kullanımı ve plan kotaları (org geneli anahtar) */
        get: operations["PublicBillingController_usage"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/journeys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Journey listesi */
        get: operations["PublicJourneysController_list"];
        put?: never;
        /** Journey oluştur (taslak) */
        post: operations["PublicJourneysController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Journey detayı */
        get: operations["PublicJourneysController_get"];
        put?: never;
        post?: never;
        /** Hiç yayınlanmamış journey'i sil */
        delete: operations["PublicJourneysController_remove"];
        options?: never;
        head?: never;
        /** Ad / açıklama */
        patch: operations["PublicJourneysController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}/draft": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Taslağı kaydet */
        put: operations["PublicJourneysController_saveDraft"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}/nodes/{nodeId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Taslaktaki düğümü güncelle */
        patch: operations["PublicJourneysController_updateNode"];
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}/versions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Sürümler */
        get: operations["PublicJourneysController_versions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}/publish": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Yayınla */
        post: operations["PublicJourneysController_publish"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}/pause": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Duraklat */
        post: operations["PublicJourneysController_pause"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}/resume": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Devam ettir */
        post: operations["PublicJourneysController_resume"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}/archive": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Arşivle */
        post: operations["PublicJourneysController_archive"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}/duplicate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Kopyala */
        post: operations["PublicJourneysController_duplicate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Düğüm bazlı istatistik */
        get: operations["PublicJourneysController_stats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}/runs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Run listesi */
        get: operations["PublicJourneysController_runs"];
        put?: never;
        /** Kullanıcıyı journey'e sok (external_id, user_id veya alias; context Liquid custom_data) */
        post: operations["PublicJourneysController_trigger"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/journeys/{journeyId}/runs/{runId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Run detayı ve adımlar */
        get: operations["PublicJourneysController_run"];
        put?: never;
        post?: never;
        /** Run'ı sonlandır */
        delete: operations["PublicJourneysController_exitRun"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/users/by/{label}/{value}/journeys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kullanıcının journey run'ları */
        get: operations["PublicUserJourneysController_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/integrations/zapier/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Zapier bağlantı testi: anahtarın app’i ve kapsamları */
        get: operations["PublicZapierController_me"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/integrations/zapier/hooks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** REST Hook aboneliği (Zap açıldı) */
        post: operations["PublicZapierController_subscribe"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/integrations/zapier/hooks/{hookId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** REST Hook aboneliğini sil (Zap kapatıldı) */
        delete: operations["PublicZapierController_unsubscribe"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/integrations/zapier/samples": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Tetik örnekleri (performList): son kayıtlar, abonelik gövdesiyle aynı biçim */
        get: operations["PublicZapierController_samples"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Bağlı reklam hesapları */
        get: operations["PublicAdsController_listAccounts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/audiences": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Reklam kitleleri */
        get: operations["PublicAdsController_listAudiences"];
        put?: never;
        /** Reklam kitlesi oluştur */
        post: operations["PublicAdsController_createAudience"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/audiences/{audienceId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Reklam kitlesi ayrıntısı */
        get: operations["PublicAdsController_getAudience"];
        put?: never;
        post?: never;
        /** Reklam kitlesini sil */
        delete: operations["PublicAdsController_removeAudience"];
        options?: never;
        head?: never;
        /** Reklam kitlesini güncelle */
        patch: operations["PublicAdsController_updateAudience"];
        trace?: never;
    };
    "/v1/apps/{appId}/ads/audiences/{audienceId}/sync": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Senkronu şimdi çalıştır */
        post: operations["PublicAdsController_sync"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/audiences/{audienceId}/syncs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Senkron geçmişi */
        get: operations["PublicAdsController_syncs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/audiences/{audienceId}/lookalikes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Benzer kitle (lookalike) oluştur */
        post: operations["PublicAdsController_lookalike"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/campaigns": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kampanya / reklam seti / reklam listesi ve metrikler */
        get: operations["PublicAdsReportingController_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/campaigns/{entityId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kampanya / reklam seti / reklam ayrıntısı */
        get: operations["PublicAdsReportingController_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Durum ve günlük bütçe değişikliği */
        patch: operations["PublicAdsReportingController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/ads/accounts/{accountId}/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Kampanyaları ve metrikleri şimdi yenile */
        post: operations["PublicAdsReportingController_refresh"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/reports/spend": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Harcama ve performans raporu */
        get: operations["PublicAdsReportingController_spend"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/reports/attribution": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Birleşik atribüsyon raporu (ROAS, CAC) */
        get: operations["PublicAdsReportingController_attribution"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/reports/ltv": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Kohort LTV raporu */
        get: operations["PublicAdsReportingController_ltv"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/conversions-api/configs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Conversions API yapılandırmaları */
        get: operations["PublicAdsReportingController_capiConfigs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/conversions-api/deliveries": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Conversions API teslim geçmişi */
        get: operations["PublicAdsReportingController_capiDeliveries"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/alert-rules": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Bütçe uyarı kuralları */
        get: operations["PublicAdsReportingController_rules"];
        put?: never;
        /** Bütçe uyarı kuralı oluştur */
        post: operations["PublicAdsReportingController_createRule"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/ads/alert-rules/{ruleId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Bütçe uyarı kuralını sil */
        delete: operations["PublicAdsReportingController_removeRule"];
        options?: never;
        head?: never;
        /** Bütçe uyarı kuralını güncelle */
        patch: operations["PublicAdsReportingController_updateRule"];
        trace?: never;
    };
    "/v1/apps/{appId}/ads/alerts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Tetiklenen bütçe uyarıları */
        get: operations["PublicAdsReportingController_alertHistory"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/attribution": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Atribüsyon dokunuşları (UTM, fbclid/gclid/ttclid…); sahiplik kanıtı olaylarla aynı
         * @description `touch_id` tekildir (yeniden deneme çift kayıt oluşturmaz). `landing_url` yalnızca origin + yol olarak saklanır.
         */
        post: operations["SdkAdsController_attribution"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/mcp/campaign-drafts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Kampanya taslağı oluştur (MCP onaylı mod; gönderim yapmaz) */
        post: operations["McpDraftsController_createCampaignDraft"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/mcp/segment-drafts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Segment taslağı oluştur (MCP onaylı mod; dinamik segment) */
        post: operations["McpDraftsController_createSegmentDraft"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/web-campaigns": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Yayındaki web kampanyaları (tetik/koşul/sıklık SDK'da değerlendirilir). ETag ve 60 sn önbellek: yayın değişikliği en geç 1 dk içinde yansır. */
        get: operations["SdkGrowthController_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/web-campaigns/{campaignId}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Web kampanyası gösterim / tıklama / kapatma / dönüşüm */
        post: operations["SdkGrowthController_event"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/forms/{formId}/submissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Form gönderimi: kullanıcı/abonelik oluşturur veya bağlar, rıza kaydı tutar, journey olayı üretir */
        post: operations["SdkGrowthController_submit"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sdk/v1/apps/{appId}/surveys/{surveyId}/responses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Anket yanıtı (web pop-up veya uygulama içi yerel arayüz) */
        post: operations["SdkGrowthController_respond"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/web-campaigns": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Web kampanyaları */
        get: operations["PublicWebCampaignsController_list"];
        put?: never;
        /** Web kampanyası oluştur (taslak) */
        post: operations["PublicWebCampaignsController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/web-campaigns/{campaignId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Web kampanyası detayı ve istatistikleri */
        get: operations["PublicWebCampaignsController_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Web kampanyasını düzenle */
        patch: operations["PublicWebCampaignsController_update"];
        trace?: never;
    };
    "/v1/apps/{appId}/web-campaigns/{campaignId}/report": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Günlük seri */
        get: operations["PublicWebCampaignsController_report"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/web-campaigns/{campaignId}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Yayınla / duraklat / arşivle */
        post: operations["PublicWebCampaignsController_status"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/forms": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Formlar */
        get: operations["PublicFormsController_list"];
        put?: never;
        /** Form oluştur */
        post: operations["PublicFormsController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/forms/{formId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Form detayı */
        get: operations["PublicFormsController_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/forms/{formId}/submissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Form gönderimleri */
        get: operations["PublicFormsController_submissions"];
        put?: never;
        /** Sunucu tarafı form gönderimi (`external_id` verilirse o kullanıcının profili güncellenir) */
        post: operations["PublicFormsController_submit"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/surveys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Anketler */
        get: operations["PublicSurveysController_list"];
        put?: never;
        /** Anket oluştur (taslak) */
        post: operations["PublicSurveysController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/surveys/{surveyId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Anket detayı */
        get: operations["PublicSurveysController_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/surveys/{surveyId}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Etkinleştir / kapat */
        post: operations["PublicSurveysController_status"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/surveys/{surveyId}/report": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** NPS / CSAT raporu */
        get: operations["PublicSurveysController_report"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/surveys/{surveyId}/responses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Anket yanıtları */
        get: operations["PublicSurveysController_responses"];
        put?: never;
        /** Sunucu tarafı anket yanıtı (`external_id` ile kullanıcıya bağlanır) */
        post: operations["PublicSurveysController_respond"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/landing-pages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Landing sayfaları */
        get: operations["PublicLandingPagesController_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/landing-pages/{pageId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Landing sayfası detayı */
        get: operations["PublicLandingPagesController_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/landing-pages/{pageId}/publish": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Taslağı yayınla */
        post: operations["PublicLandingPagesController_publish"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/apps/{appId}/landing-pages/{pageId}/unpublish": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Yayından kaldır */
        post: operations["PublicLandingPagesController_unpublish"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CreateAppApiKeyDto: {
            name: string;
            scopes: ("admin" | "notifications:write" | "users:read" | "users:write" | "events:write" | "segments:read" | "analytics:read" | "mcp:write")[];
            /**
             * @default live
             * @enum {string}
             */
            environment: "live" | "test";
            expires_at?: string | null;
            ip_allowlist?: string[];
        };
        UpdateApiKeyDto: {
            name?: string;
            scopes?: ("admin" | "notifications:write" | "users:read" | "users:write" | "events:write" | "segments:read" | "analytics:read" | "mcp:write")[];
            ip_allowlist?: string[];
            expires_at?: string | null;
        };
        CreateIdentityKeyDto: {
            kid?: string;
            label?: string;
            public_jwk?: {
                [key: string]: unknown;
            };
            public_key_pem?: string;
        };
        SdkRegisterDto: {
            /** @enum {string} */
            channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
            token: string;
            /** @default {} */
            device: {
                model?: string;
                os?: string;
                os_version?: string;
                app_version?: string | null;
                sdk_version?: string;
                sdk_platform?: string;
                carrier?: string;
                locale?: string;
                timezone?: string;
                push_capable?: boolean;
                /** @enum {string} */
                push_environment?: "sandbox" | "production";
            };
            test_device?: boolean;
            user?: {
                external_id?: string;
                identity_hash?: string;
                tags?: {
                    [key: string]: string;
                };
                properties?: {
                    [key: string]: unknown;
                };
                subscription_id?: string;
                token_hash?: string;
            };
            ownership_proof?: boolean;
        };
        SdkSubscriptionPatchDto: {
            token_hash?: string;
            identity_hash?: string;
            token?: string;
            device?: {
                model?: string;
                os?: string;
                os_version?: string;
                app_version?: string | null;
                sdk_version?: string;
                sdk_platform?: string;
                carrier?: string;
                locale?: string;
                timezone?: string;
                push_capable?: boolean;
                /** @enum {string} */
                push_environment?: "sandbox" | "production";
            };
            opted_in?: boolean;
            location?: {
                lat: number;
                lng: number;
                accuracy_m?: number;
            } | null;
            advertising_id?: string | null;
        };
        SdkLoginDto: {
            external_id: string;
            identity_hash?: string;
            token_hash?: string;
        };
        SdkLogoutDto: {
            token_hash?: string;
            identity_hash?: string;
        };
        SdkUserPatchDto: {
            tags?: {
                [key: string]: string | null;
            };
            properties?: {
                [key: string]: unknown;
            };
            deltas?: {
                session_count?: number;
                session_time?: number;
                purchases?: {
                    sku: string;
                    amount: number;
                    iso?: string;
                    /** @default 1 */
                    count: number;
                }[];
            };
            identity_hash?: string;
        };
        SdkIdentityDto: {
            identity: {
                [key: string]: string;
            };
            identity_hash?: string;
        };
        SdkSessionDto: {
            token_hash?: string;
            identity_hash?: string;
            subscription_id: string;
            duration_seconds?: number;
            app_version?: string | null;
            sdk_version?: string;
        };
        SdkEventsDto: {
            events: {
                name: string;
                /** @default {} */
                properties: {
                    [key: string]: unknown;
                };
                value?: number;
                /** Format: date-time */
                occurred_at?: string;
                event_id?: string;
                subscription_id?: string;
                external_id?: string;
                token_hash?: string;
                identity_hash?: string;
            }[];
        };
        OpenedDto: {
            button_id?: string;
        };
        CreateLiveActivityTypeDto: {
            name: string;
            description?: string;
            content_state_schema: {
                /** @constant */
                type: "object";
                properties: {
                    [key: string]: {
                        /** @enum {string} */
                        type: "string" | "number" | "integer" | "boolean";
                        enum?: (string | number)[];
                        maxLength?: number;
                        minimum?: number;
                        maximum?: number;
                        description?: string;
                    };
                };
                required?: string[];
            };
            attributes_schema?: {
                /** @constant */
                type: "object";
                properties: {
                    [key: string]: {
                        /** @enum {string} */
                        type: "string" | "number" | "integer" | "boolean";
                        enum?: (string | number)[];
                        maxLength?: number;
                        minimum?: number;
                        maximum?: number;
                        description?: string;
                    };
                };
                required?: string[];
            };
        };
        UpdateLiveActivityTypeDto: {
            description?: string | null;
            content_state_schema?: {
                /** @constant */
                type: "object";
                properties: {
                    [key: string]: {
                        /** @enum {string} */
                        type: "string" | "number" | "integer" | "boolean";
                        enum?: (string | number)[];
                        maxLength?: number;
                        minimum?: number;
                        maximum?: number;
                        description?: string;
                    };
                };
                required?: string[];
            };
            attributes_schema?: {
                /** @constant */
                type: "object";
                properties: {
                    [key: string]: {
                        /** @enum {string} */
                        type: "string" | "number" | "integer" | "boolean";
                        enum?: (string | number)[];
                        maxLength?: number;
                        minimum?: number;
                        maximum?: number;
                        description?: string;
                    };
                };
                required?: string[];
            };
        };
        StartLiveActivityDto: {
            activity_id?: string;
            attributes?: {
                [key: string]: string | number | boolean;
            };
            target: {
                include_external_ids?: string[];
                include_subscription_ids?: string[];
                included_segments?: string[];
                all?: boolean;
            };
            content_state: {
                [key: string]: string | number | boolean;
            };
            alert?: {
                title?: {
                    [key: string]: string;
                };
                body?: {
                    [key: string]: string;
                };
                sound?: string;
            };
            stale_date?: number;
            dismissal_date?: number;
            relevance_score?: number;
            priority?: 5 | 10;
            name?: string;
        };
        UpdateLiveActivityDto: {
            activity_id: string;
            content_state: {
                [key: string]: string | number | boolean;
            };
            alert?: {
                title?: {
                    [key: string]: string;
                };
                body?: {
                    [key: string]: string;
                };
                sound?: string;
            };
            stale_date?: number;
            dismissal_date?: number;
            relevance_score?: number;
            priority?: 5 | 10;
            name?: string;
        };
        EndLiveActivityDto: {
            activity_id: string;
            content_state?: {
                [key: string]: string | number | boolean;
            };
            alert?: {
                title?: {
                    [key: string]: string;
                };
                body?: {
                    [key: string]: string;
                };
                sound?: string;
            };
            stale_date?: number;
            dismissal_date?: number;
            relevance_score?: number;
            priority?: 5 | 10;
            name?: string;
        };
        SdkLiveActivityTokenDto: {
            subscription_id: string;
            activity_type: string;
            /** @enum {string} */
            kind: "push_to_start" | "update";
            activity_id?: string;
            token: string;
            token_hash?: string;
            identity_hash?: string;
        };
        SdkLiveActivityTokenDeleteDto: {
            subscription_id: string;
            activity_type: string;
            /** @enum {string} */
            kind: "push_to_start" | "update";
            activity_id?: string;
            token_hash?: string;
            identity_hash?: string;
        };
        CreateDataFeedDto: {
            name: string;
            description?: string | null;
            url_template: string;
            /** @enum {string} */
            method?: "GET" | "POST";
            body_template?: string | null;
            headers?: {
                [key: string]: string;
            };
            secret_headers?: {
                [key: string]: string;
            };
            cache_ttl_seconds?: number;
            timeout_ms?: number;
            enabled?: boolean;
        };
        UpdateDataFeedDto: {
            description?: string | null;
            url_template?: string;
            /** @enum {string} */
            method?: "GET" | "POST";
            body_template?: string | null;
            headers?: {
                [key: string]: string;
            };
            secret_headers?: {
                [key: string]: string;
            } | null;
            cache_ttl_seconds?: number;
            timeout_ms?: number;
            enabled?: boolean;
        };
        TestDataFeedDto: {
            external_id?: string;
            user_id?: string;
        };
        UpdateContentTableDto: {
            description?: string | null;
        };
        SdkErrorsDto: {
            errors: {
                /**
                 * @default error
                 * @enum {string}
                 */
                level: "error" | "warning";
                /** @enum {string} */
                platform: "web" | "android" | "ios" | "flutter" | "react_native" | "node";
                sdk_version?: string;
                code?: string;
                message: string;
                subscription_id?: string;
                context?: {
                    [key: string]: unknown;
                };
                /** Format: date-time */
                occurred_at?: string;
            }[];
        };
        WebhookPreviewDto: {
            /** @enum {string} */
            event_type: "message.queued" | "message.completed" | "message.failed" | "delivery.sent" | "delivery.delivered" | "delivery.failed" | "delivery.opened" | "delivery.clicked" | "delivery.bounced" | "delivery.complained" | "delivery.unsubscribed" | "in_app.impression" | "in_app.clicked" | "in_app.dismissed" | "subscription.created" | "subscription.unsubscribed" | "subscription.invalidated" | "user.created" | "user.updated" | "user.merged" | "user.deleted" | "event.received" | "conversion.created" | "campaign.scheduled" | "campaign.started" | "campaign.completed" | "journey.entered" | "journey.step_completed" | "journey.completed" | "journey.exited" | "conversation.created" | "conversation.message" | "conversation.assigned" | "conversation.resolved" | "audit.created" | "form.submitted" | "survey.responded" | "ad_audience.synced" | "ad_account.revoked" | "ad_budget.alert" | "ad_insights.imported" | "webhook.test";
            data?: {
                [key: string]: unknown;
            };
            body_template?: string | null;
            /**
             * @description Şablon çıktısının içerik türü (varsayılan application/json).
             * @enum {string}
             */
            body_content_type?: "application/json" | "text/plain";
            filters?: {
                /** @enum {string} */
                match: "all" | "any";
                conditions: {
                    field: string;
                    /** @enum {string} */
                    op: "eq" | "neq" | "in" | "not_in" | "starts_with" | "contains" | "exists" | "not_exists";
                    value?: (string | number | boolean) | (string | number)[];
                }[];
            } | null;
            batch?: boolean;
        };
        CreateWebhookDto: {
            url: string;
            description?: string | null;
            events: ("message.queued" | "message.completed" | "message.failed" | "delivery.sent" | "delivery.delivered" | "delivery.failed" | "delivery.opened" | "delivery.clicked" | "delivery.bounced" | "delivery.complained" | "delivery.unsubscribed" | "in_app.impression" | "in_app.clicked" | "in_app.dismissed" | "subscription.created" | "subscription.unsubscribed" | "subscription.invalidated" | "user.created" | "user.updated" | "user.merged" | "user.deleted" | "event.received" | "conversion.created" | "campaign.scheduled" | "campaign.started" | "campaign.completed" | "journey.entered" | "journey.step_completed" | "journey.completed" | "journey.exited" | "conversation.created" | "conversation.message" | "conversation.assigned" | "conversation.resolved" | "audit.created" | "form.submitted" | "survey.responded" | "ad_audience.synced" | "ad_account.revoked" | "ad_budget.alert" | "ad_insights.imported")[];
            event_filters?: {
                event_names?: string[];
            };
            batch?: boolean;
            headers?: {
                [key: string]: string;
            };
            body_template?: string | null;
            /**
             * @description Şablon çıktısının içerik türü (varsayılan application/json).
             * @enum {string}
             */
            body_content_type?: "application/json" | "text/plain";
            filters?: {
                /** @enum {string} */
                match: "all" | "any";
                conditions: {
                    field: string;
                    /** @enum {string} */
                    op: "eq" | "neq" | "in" | "not_in" | "starts_with" | "contains" | "exists" | "not_exists";
                    value?: (string | number | boolean) | (string | number)[];
                }[];
            } | null;
        };
        UpdateWebhookDto: {
            url?: string;
            description?: string | null;
            events?: ("message.queued" | "message.completed" | "message.failed" | "delivery.sent" | "delivery.delivered" | "delivery.failed" | "delivery.opened" | "delivery.clicked" | "delivery.bounced" | "delivery.complained" | "delivery.unsubscribed" | "in_app.impression" | "in_app.clicked" | "in_app.dismissed" | "subscription.created" | "subscription.unsubscribed" | "subscription.invalidated" | "user.created" | "user.updated" | "user.merged" | "user.deleted" | "event.received" | "conversion.created" | "campaign.scheduled" | "campaign.started" | "campaign.completed" | "journey.entered" | "journey.step_completed" | "journey.completed" | "journey.exited" | "conversation.created" | "conversation.message" | "conversation.assigned" | "conversation.resolved" | "audit.created" | "form.submitted" | "survey.responded" | "ad_audience.synced" | "ad_account.revoked" | "ad_budget.alert" | "ad_insights.imported")[];
            event_filters?: {
                event_names?: string[];
            };
            batch?: boolean;
            headers?: {
                [key: string]: string;
            } | null;
            /** @enum {string} */
            status?: "active" | "disabled";
            body_template?: string | null;
            /**
             * @description Şablon çıktısının içerik türü (varsayılan application/json).
             * @enum {string}
             */
            body_content_type?: "application/json" | "text/plain";
            filters?: {
                /** @enum {string} */
                match: "all" | "any";
                conditions: {
                    field: string;
                    /** @enum {string} */
                    op: "eq" | "neq" | "in" | "not_in" | "starts_with" | "contains" | "exists" | "not_exists";
                    value?: (string | number | boolean) | (string | number)[];
                }[];
            } | null;
        };
        UpdateWarehouseExportDto: {
            name?: string;
            tables?: ("deliveries" | "delivery_events" | "events" | "conversions" | "users" | "subscriptions")[];
            /** @enum {string} */
            schedule?: "hourly" | "daily";
            enabled?: boolean;
            config?: {
                [key: string]: unknown;
            };
            credentials?: {
                [key: string]: unknown;
            };
        };
        CreateAppDto: {
            name: string;
            slug?: string;
            /** @default {} */
            platform_flags: {
                ios?: boolean;
                android?: boolean;
                web?: boolean;
                email?: boolean;
                sms?: boolean;
            };
            /** @default en */
            default_language: string;
            /** @default UTC */
            timezone: string;
        };
        UpdateAppDto: {
            name?: string;
            platform_flags?: {
                ios?: boolean;
                android?: boolean;
                web?: boolean;
                email?: boolean;
                sms?: boolean;
            };
            icon_url?: string | null;
            default_language?: string;
            timezone?: string;
            settings?: {
                quietHours?: {
                    start: string;
                    end: string;
                    /** @enum {string} */
                    timezoneMode: "user" | "app";
                } | null;
                frequencyCap?: {
                    max: number;
                    windowHours: number;
                } | null;
                frequencyCaps?: {
                    max: number;
                    window: {
                        value: number;
                        /** @enum {string} */
                        unit: "minutes" | "hours" | "days" | "weeks";
                    };
                    channels?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
                }[];
                inApp?: {
                    minIntervalSeconds?: number;
                };
                androidChannels?: {
                    id: string;
                    name: string;
                    description?: string;
                    /** @enum {string} */
                    importance: "low" | "default" | "high" | "urgent";
                    sound?: string;
                    vibration?: boolean;
                    group?: string;
                }[];
                sms?: {
                    helpReply?: string;
                    stopReply?: string;
                    autoReply?: boolean;
                };
                preferenceCenter?: {
                    enabled?: boolean;
                    brandName?: string;
                    logoUrl?: string;
                    accentColor?: string;
                    customUnsubscribeUrl?: string;
                    texts?: {
                        [key: string]: {
                            title?: string;
                            description?: string;
                            unsubscribeAll?: string;
                            saved?: string;
                        };
                    };
                };
                defaultTtlSeconds?: number;
                identityVerificationRequired?: boolean;
                allowedOrigins?: string[];
                campaignApprovalRequired?: boolean;
                webPush?: {
                    serviceWorkerPath?: string;
                    serviceWorkerScope?: string;
                    prompt?: {
                        enabled: boolean;
                        /** @enum {string} */
                        type: "slidedown" | "native";
                        /** @enum {string} */
                        collect?: "push" | "email" | "sms" | "email_sms";
                        delaySeconds?: number;
                        pageViews?: number;
                        scrollPercent?: number;
                        texts?: {
                            [key: string]: {
                                title?: string;
                                message?: string;
                                accept?: string;
                                cancel?: string;
                            };
                        };
                        categories?: {
                            tag: string;
                            label: {
                                [key: string]: string;
                            };
                        }[];
                        accentColor?: string;
                    };
                    welcomeNotification?: {
                        enabled: boolean;
                        url?: string;
                        texts?: {
                            [key: string]: {
                                title?: string;
                                message?: string;
                            };
                        };
                    };
                    clickBehavior?: {
                        /** @enum {string} */
                        match: "exact" | "origin";
                        /** @enum {string} */
                        action: "navigate" | "focus";
                    };
                    customLink?: {
                        enabled: boolean;
                        /** @enum {string} */
                        style: "button" | "link";
                        /** @enum {string} */
                        size: "small" | "medium" | "large";
                        color?: {
                            button?: string;
                            text?: string;
                        };
                        texts?: {
                            [key: string]: {
                                subscribe?: string;
                                unsubscribe?: string;
                                explanation?: string;
                            };
                        };
                        unsubscribeEnabled?: boolean;
                    };
                    promptBackoffDays?: number[];
                };
                onboarding?: {
                    step: number;
                    simulation?: boolean;
                    completed_at?: string | null;
                    version?: number;
                    platforms?: ("ios" | "android" | "huawei" | "web")[];
                    /** @enum {string} */
                    framework?: "native" | "flutter" | "react-native" | "unity" | "capacitor" | "cordova" | "maui";
                    /** @enum {string} */
                    web_integration?: "code" | "wordpress";
                };
                sdkSetup?: {
                    version: number;
                    platform: string | null;
                    step: string;
                    furthest: string;
                    variant?: string | null;
                    detectedSubscriptionId?: string | null;
                    testMessageId?: string | null;
                    completedAt?: string | null;
                } | null;
            };
            /** @enum {string} */
            identity_verification_mode?: "hmac" | "jwt" | "both";
        };
        UpsertUserDto: {
            identity?: {
                external_id: string;
            } & {
                [key: string]: string;
            };
            external_id?: string;
            properties?: {
                [key: string]: unknown;
            };
            tags?: {
                [key: string]: string;
            };
            subscriptions?: {
                /** @enum {string} */
                channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                token: string;
                /** @default {} */
                device: {
                    model?: string;
                    os?: string;
                    os_version?: string;
                    app_version?: string | null;
                    sdk_version?: string;
                    sdk_platform?: string;
                    carrier?: string;
                    locale?: string;
                    timezone?: string;
                    push_capable?: boolean;
                    /** @enum {string} */
                    push_environment?: "sandbox" | "production";
                };
                /** @enum {string} */
                status?: "subscribed" | "unsubscribed";
                opt_in?: {
                    source: string;
                    /** Format: date-time */
                    at?: string;
                };
            }[];
        };
        PatchUserDto: {
            properties?: {
                [key: string]: unknown;
            };
            tags?: {
                [key: string]: string | null;
            };
            deltas?: {
                session_count?: number;
                session_time?: number;
                purchases?: {
                    sku: string;
                    amount: number;
                    iso?: string;
                    /** @default 1 */
                    count: number;
                }[];
            };
        };
        AddAliasDto: {
            identity: {
                [key: string]: string;
            };
        };
        AddSubscriptionDto: {
            /** @enum {string} */
            channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
            token: string;
            /** @default {} */
            device: {
                model?: string;
                os?: string;
                os_version?: string;
                app_version?: string | null;
                sdk_version?: string;
                sdk_platform?: string;
                carrier?: string;
                locale?: string;
                timezone?: string;
                push_capable?: boolean;
                /** @enum {string} */
                push_environment?: "sandbox" | "production";
            };
            /** @enum {string} */
            status?: "subscribed" | "unsubscribed";
            opt_in?: {
                source: string;
                /** Format: date-time */
                at?: string;
            };
        };
        PatchSubscriptionDto: {
            token?: string;
            device?: {
                model?: string;
                os?: string;
                os_version?: string;
                app_version?: string | null;
                sdk_version?: string;
                sdk_platform?: string;
                carrier?: string;
                locale?: string;
                timezone?: string;
                push_capable?: boolean;
                /** @enum {string} */
                push_environment?: "sandbox" | "production";
            };
            /** @enum {string} */
            status?: "subscribed" | "unsubscribed";
            test_device?: boolean;
            test_device_name?: string;
        };
        SetOwnerDto: {
            external_id: string;
        };
        ApiEventsDto: {
            events: {
                name: string;
                /** @default {} */
                properties: {
                    [key: string]: unknown;
                };
                value?: number;
                /** Format: date-time */
                occurred_at?: string;
                event_id?: string;
                subscription_id?: string;
                external_id?: string;
            }[];
        };
        CreateNotificationDto: {
            app_id?: string;
            idempotency_key?: string;
            target: {
                all?: boolean;
                include_subscription_ids?: string[];
                include_external_ids?: string[];
                include_aliases?: {
                    [key: string]: string[];
                };
                included_segments?: string[];
                excluded_segments?: string[];
                filters?: unknown;
                channels?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
                test_devices_only?: boolean;
                email_to?: string[];
                include_phone_numbers?: string[];
            };
            headings?: {
                [key: string]: string;
            };
            contents?: {
                [key: string]: string;
            };
            subtitle?: {
                [key: string]: string;
            };
            url?: string;
            app_url?: string;
            data?: {
                [key: string]: string;
            };
            buttons?: {
                id: string;
                text: string;
                icon?: string;
                url?: string;
            }[];
            big_picture?: string;
            ios_attachments?: {
                [key: string]: string;
            };
            ios_sound?: string;
            /** @enum {string} */
            ios_badge_type?: "None" | "SetTo" | "Increase";
            ios_badge_count?: number;
            /** @enum {string} */
            ios_interruption_level?: "passive" | "active" | "time-sensitive" | "critical";
            ios_category?: string;
            thread_id?: string;
            ios_relevance_score?: number;
            target_content_identifier?: string;
            android_channel_id?: string;
            android_group?: string;
            android_sound?: string;
            small_icon?: string;
            large_icon?: string;
            android_accent_color?: string;
            android_visibility?: 1 | 0 | -1;
            chrome_web_icon?: string;
            chrome_web_image?: string;
            chrome_web_badge?: string;
            web_push_topic?: string;
            web_buttons?: {
                id: string;
                text: string;
                icon?: string;
                url?: string;
            }[];
            require_interaction?: boolean;
            content_available?: boolean;
            mutable_content?: boolean;
            collapse_id?: string;
            priority?: 5 | 10;
            ttl?: number;
            /** Format: date-time */
            send_after?: string;
            /** @enum {string} */
            delayed_option?: "timezone" | "optimized";
            delivery_time_of_day?: string;
            template_id?: string;
            custom_data?: {
                [key: string]: unknown;
            };
            email_subject?: string;
            email_body?: string;
            email_mjml?: string;
            email_preheader?: string;
            email_from_name?: string;
            /** Format: email */
            email_from_address?: string;
            /** Format: email */
            email_reply_to_address?: string;
            disable_email_click_tracking?: boolean;
            sms_from?: string;
            sms_media_urls?: string[];
            disable_sms_link_shortening?: boolean;
            whatsapp_template?: {
                name: string;
                language: string;
                header?: {
                    /** @constant */
                    type: "text";
                    text: string;
                } | {
                    /** @enum {string} */
                    type: "image" | "video" | "document";
                    url: string;
                    filename?: string;
                };
                body_params?: string[];
                button_params?: {
                    index: number;
                    /** @enum {string} */
                    sub_type: "url" | "quick_reply" | "copy_code";
                    value: string;
                }[];
            };
            whatsapp_media?: {
                /** @enum {string} */
                type: "image" | "video" | "document" | "audio";
                url: string;
                filename?: string;
            };
            whatsapp_interactive?: {
                /** @enum {string} */
                type: "button" | "list";
                header?: string;
                footer?: string;
                buttons?: {
                    id: string;
                    title: string;
                }[];
                list?: {
                    button: string;
                    sections: {
                        title?: string;
                        rows: {
                            id: string;
                            title: string;
                            description?: string;
                        }[];
                    }[];
                };
            };
            rcs_card?: {
                title?: {
                    [key: string]: string;
                };
                description?: {
                    [key: string]: string;
                };
                media_url?: string;
                /** @enum {string} */
                media_height?: "SHORT" | "MEDIUM" | "TALL";
                /** @enum {string} */
                orientation?: "VERTICAL" | "HORIZONTAL";
            };
            rcs_suggestions?: ({
                /** @constant */
                type: "reply";
                text: string;
                postback?: string;
            } | {
                /** @constant */
                type: "url";
                text: string;
                url: string;
                postback?: string;
            } | {
                /** @constant */
                type: "dial";
                text: string;
                phone: string;
                postback?: string;
            })[];
            rcs_content_sid?: string;
            rcs_content_variables?: {
                [key: string]: string;
            };
            rcs_fallback_text?: {
                [key: string]: string;
            };
            add_to_inbox?: boolean;
            inbox_ttl?: number;
            frequency_cap_exempt?: boolean;
            quiet_hours_exempt?: boolean;
            one_per_user?: boolean;
            throttle_rate_per_minute?: number;
            include_unsubscribed?: boolean;
            name?: string;
            labels?: string[];
            category?: string;
        };
        EstimateAudienceDto: {
            app_id?: string;
            target: {
                all?: boolean;
                include_subscription_ids?: string[];
                include_external_ids?: string[];
                include_aliases?: {
                    [key: string]: string[];
                };
                included_segments?: string[];
                excluded_segments?: string[];
                filters?: unknown;
                channels?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
                test_devices_only?: boolean;
                email_to?: string[];
                include_phone_numbers?: string[];
            };
            include_unsubscribed?: boolean;
        };
        FunnelBodyDto: {
            steps: {
                name: string;
                where?: {
                    key: string;
                    value: string;
                };
            }[];
            /** Format: date-time */
            from?: string;
            /** Format: date-time */
            to?: string;
            /** @default 72 */
            window_hours: number;
            /** @default false */
            compare: boolean;
            /**
             * @default json
             * @enum {string}
             */
            format: "json" | "csv";
        };
        PatchEventDefinitionDto: {
            display_name?: string | null;
            is_conversion?: boolean;
            outcome_unique?: boolean;
            outcome_unattributed?: boolean;
            retention_days?: number | null;
        };
        CreateExportDto: {
            /** @enum {string} */
            type: "users" | "subscriptions" | "events" | "deliveries" | "message_events";
            /** @default {} */
            filters: {
                /** Format: date-time */
                from?: string;
                /** Format: date-time */
                to?: string;
                name?: string;
                message_id?: string;
                campaign_id?: string;
                status?: string;
                /** @enum {string} */
                channel?: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                segment_id?: string;
            };
        };
        CreateTemplateDto: {
            name: string;
            channel?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs") | null;
            tags?: string[];
            content: {
                headings?: {
                    [key: string]: string;
                };
                contents?: {
                    [key: string]: string;
                };
                subtitle?: {
                    [key: string]: string;
                };
                url?: string;
                app_url?: string;
                data?: {
                    [key: string]: string;
                };
                buttons?: {
                    id: string;
                    text: string;
                    icon?: string;
                    url?: string;
                }[];
                big_picture?: string;
                ios_attachments?: {
                    [key: string]: string;
                };
                ios_sound?: string;
                /** @enum {string} */
                ios_badge_type?: "None" | "SetTo" | "Increase";
                ios_badge_count?: number;
                /** @enum {string} */
                ios_interruption_level?: "passive" | "active" | "time-sensitive" | "critical";
                ios_category?: string;
                android_channel_id?: string;
                android_group?: string;
                android_sound?: string;
                chrome_web_icon?: string;
                chrome_web_image?: string;
                chrome_web_badge?: string;
                web_push_topic?: string;
                content_available?: boolean;
                mutable_content?: boolean;
                custom_data?: {
                    [key: string]: unknown;
                };
                email_subject?: string;
                email_body?: string;
                email_mjml?: string;
                email_preheader?: string;
                email_from_name?: string;
                /** Format: email */
                email_from_address?: string;
                /** Format: email */
                email_reply_to_address?: string;
                disable_email_click_tracking?: boolean;
                sms_from?: string;
                disable_sms_link_shortening?: boolean;
                add_to_inbox?: boolean;
                inbox_ttl?: number;
                thread_id?: string;
                ios_relevance_score?: number;
                target_content_identifier?: string;
                small_icon?: string;
                large_icon?: string;
                android_accent_color?: string;
                android_visibility?: 1 | 0 | -1;
                web_buttons?: {
                    id: string;
                    text: string;
                    icon?: string;
                    url?: string;
                }[];
                require_interaction?: boolean;
                sms_media_urls?: string[];
                whatsapp_template?: {
                    name: string;
                    language: string;
                    header?: {
                        /** @constant */
                        type: "text";
                        text: string;
                    } | {
                        /** @enum {string} */
                        type: "image" | "video" | "document";
                        url: string;
                        filename?: string;
                    };
                    body_params?: string[];
                    button_params?: {
                        index: number;
                        /** @enum {string} */
                        sub_type: "url" | "quick_reply" | "copy_code";
                        value: string;
                    }[];
                };
                whatsapp_media?: {
                    /** @enum {string} */
                    type: "image" | "video" | "document" | "audio";
                    url: string;
                    filename?: string;
                };
                whatsapp_interactive?: {
                    /** @enum {string} */
                    type: "button" | "list";
                    header?: string;
                    footer?: string;
                    buttons?: {
                        id: string;
                        title: string;
                    }[];
                    list?: {
                        button: string;
                        sections: {
                            title?: string;
                            rows: {
                                id: string;
                                title: string;
                                description?: string;
                            }[];
                        }[];
                    };
                };
                rcs_card?: {
                    title?: {
                        [key: string]: string;
                    };
                    description?: {
                        [key: string]: string;
                    };
                    media_url?: string;
                    /** @enum {string} */
                    media_height?: "SHORT" | "MEDIUM" | "TALL";
                    /** @enum {string} */
                    orientation?: "VERTICAL" | "HORIZONTAL";
                };
                rcs_suggestions?: ({
                    /** @constant */
                    type: "reply";
                    text: string;
                    postback?: string;
                } | {
                    /** @constant */
                    type: "url";
                    text: string;
                    url: string;
                    postback?: string;
                } | {
                    /** @constant */
                    type: "dial";
                    text: string;
                    phone: string;
                    postback?: string;
                })[];
                rcs_content_sid?: string;
                rcs_content_variables?: {
                    [key: string]: string;
                };
                rcs_fallback_text?: {
                    [key: string]: string;
                };
            };
        };
        UpdateTemplateDto: {
            name?: string;
            channel?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs") | null;
            tags?: string[];
            content?: {
                headings?: {
                    [key: string]: string;
                };
                contents?: {
                    [key: string]: string;
                };
                subtitle?: {
                    [key: string]: string;
                };
                url?: string;
                app_url?: string;
                data?: {
                    [key: string]: string;
                };
                buttons?: {
                    id: string;
                    text: string;
                    icon?: string;
                    url?: string;
                }[];
                big_picture?: string;
                ios_attachments?: {
                    [key: string]: string;
                };
                ios_sound?: string;
                /** @enum {string} */
                ios_badge_type?: "None" | "SetTo" | "Increase";
                ios_badge_count?: number;
                /** @enum {string} */
                ios_interruption_level?: "passive" | "active" | "time-sensitive" | "critical";
                ios_category?: string;
                android_channel_id?: string;
                android_group?: string;
                android_sound?: string;
                chrome_web_icon?: string;
                chrome_web_image?: string;
                chrome_web_badge?: string;
                web_push_topic?: string;
                content_available?: boolean;
                mutable_content?: boolean;
                custom_data?: {
                    [key: string]: unknown;
                };
                email_subject?: string;
                email_body?: string;
                email_mjml?: string;
                email_preheader?: string;
                email_from_name?: string;
                /** Format: email */
                email_from_address?: string;
                /** Format: email */
                email_reply_to_address?: string;
                disable_email_click_tracking?: boolean;
                sms_from?: string;
                disable_sms_link_shortening?: boolean;
                add_to_inbox?: boolean;
                inbox_ttl?: number;
                thread_id?: string;
                ios_relevance_score?: number;
                target_content_identifier?: string;
                small_icon?: string;
                large_icon?: string;
                android_accent_color?: string;
                android_visibility?: 1 | 0 | -1;
                web_buttons?: {
                    id: string;
                    text: string;
                    icon?: string;
                    url?: string;
                }[];
                require_interaction?: boolean;
                sms_media_urls?: string[];
                whatsapp_template?: {
                    name: string;
                    language: string;
                    header?: {
                        /** @constant */
                        type: "text";
                        text: string;
                    } | {
                        /** @enum {string} */
                        type: "image" | "video" | "document";
                        url: string;
                        filename?: string;
                    };
                    body_params?: string[];
                    button_params?: {
                        index: number;
                        /** @enum {string} */
                        sub_type: "url" | "quick_reply" | "copy_code";
                        value: string;
                    }[];
                };
                whatsapp_media?: {
                    /** @enum {string} */
                    type: "image" | "video" | "document" | "audio";
                    url: string;
                    filename?: string;
                };
                whatsapp_interactive?: {
                    /** @enum {string} */
                    type: "button" | "list";
                    header?: string;
                    footer?: string;
                    buttons?: {
                        id: string;
                        title: string;
                    }[];
                    list?: {
                        button: string;
                        sections: {
                            title?: string;
                            rows: {
                                id: string;
                                title: string;
                                description?: string;
                            }[];
                        }[];
                    };
                };
                rcs_card?: {
                    title?: {
                        [key: string]: string;
                    };
                    description?: {
                        [key: string]: string;
                    };
                    media_url?: string;
                    /** @enum {string} */
                    media_height?: "SHORT" | "MEDIUM" | "TALL";
                    /** @enum {string} */
                    orientation?: "VERTICAL" | "HORIZONTAL";
                };
                rcs_suggestions?: ({
                    /** @constant */
                    type: "reply";
                    text: string;
                    postback?: string;
                } | {
                    /** @constant */
                    type: "url";
                    text: string;
                    url: string;
                    postback?: string;
                } | {
                    /** @constant */
                    type: "dial";
                    text: string;
                    phone: string;
                    postback?: string;
                })[];
                rcs_content_sid?: string;
                rcs_content_variables?: {
                    [key: string]: string;
                };
                rcs_fallback_text?: {
                    [key: string]: string;
                };
            };
        };
        CopyTemplateDto: {
            target_app_id: string;
            name?: string;
        };
        RenderTemplateDto: {
            /**
             * @default ios_push
             * @enum {string}
             */
            channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
            language?: string;
            user?: {
                external_id?: string;
                tags?: {
                    [key: string]: string;
                };
                properties?: {
                    [key: string]: unknown;
                };
            };
            custom_data?: {
                [key: string]: unknown;
            };
            content?: {
                headings?: {
                    [key: string]: string;
                };
                contents?: {
                    [key: string]: string;
                };
                subtitle?: {
                    [key: string]: string;
                };
                url?: string;
                app_url?: string;
                data?: {
                    [key: string]: string;
                };
                buttons?: {
                    id: string;
                    text: string;
                    icon?: string;
                    url?: string;
                }[];
                big_picture?: string;
                ios_attachments?: {
                    [key: string]: string;
                };
                ios_sound?: string;
                /** @enum {string} */
                ios_badge_type?: "None" | "SetTo" | "Increase";
                ios_badge_count?: number;
                /** @enum {string} */
                ios_interruption_level?: "passive" | "active" | "time-sensitive" | "critical";
                ios_category?: string;
                android_channel_id?: string;
                android_group?: string;
                android_sound?: string;
                chrome_web_icon?: string;
                chrome_web_image?: string;
                chrome_web_badge?: string;
                web_push_topic?: string;
                content_available?: boolean;
                mutable_content?: boolean;
                custom_data?: {
                    [key: string]: unknown;
                };
                email_subject?: string;
                email_body?: string;
                email_mjml?: string;
                email_preheader?: string;
                email_from_name?: string;
                /** Format: email */
                email_from_address?: string;
                /** Format: email */
                email_reply_to_address?: string;
                disable_email_click_tracking?: boolean;
                sms_from?: string;
                disable_sms_link_shortening?: boolean;
                add_to_inbox?: boolean;
                inbox_ttl?: number;
                thread_id?: string;
                ios_relevance_score?: number;
                target_content_identifier?: string;
                small_icon?: string;
                large_icon?: string;
                android_accent_color?: string;
                android_visibility?: 1 | 0 | -1;
                web_buttons?: {
                    id: string;
                    text: string;
                    icon?: string;
                    url?: string;
                }[];
                require_interaction?: boolean;
                sms_media_urls?: string[];
                whatsapp_template?: {
                    name: string;
                    language: string;
                    header?: {
                        /** @constant */
                        type: "text";
                        text: string;
                    } | {
                        /** @enum {string} */
                        type: "image" | "video" | "document";
                        url: string;
                        filename?: string;
                    };
                    body_params?: string[];
                    button_params?: {
                        index: number;
                        /** @enum {string} */
                        sub_type: "url" | "quick_reply" | "copy_code";
                        value: string;
                    }[];
                };
                whatsapp_media?: {
                    /** @enum {string} */
                    type: "image" | "video" | "document" | "audio";
                    url: string;
                    filename?: string;
                };
                whatsapp_interactive?: {
                    /** @enum {string} */
                    type: "button" | "list";
                    header?: string;
                    footer?: string;
                    buttons?: {
                        id: string;
                        title: string;
                    }[];
                    list?: {
                        button: string;
                        sections: {
                            title?: string;
                            rows: {
                                id: string;
                                title: string;
                                description?: string;
                            }[];
                        }[];
                    };
                };
                rcs_card?: {
                    title?: {
                        [key: string]: string;
                    };
                    description?: {
                        [key: string]: string;
                    };
                    media_url?: string;
                    /** @enum {string} */
                    media_height?: "SHORT" | "MEDIUM" | "TALL";
                    /** @enum {string} */
                    orientation?: "VERTICAL" | "HORIZONTAL";
                };
                rcs_suggestions?: ({
                    /** @constant */
                    type: "reply";
                    text: string;
                    postback?: string;
                } | {
                    /** @constant */
                    type: "url";
                    text: string;
                    url: string;
                    postback?: string;
                } | {
                    /** @constant */
                    type: "dial";
                    text: string;
                    phone: string;
                    postback?: string;
                })[];
                rcs_content_sid?: string;
                rcs_content_variables?: {
                    [key: string]: string;
                };
                rcs_fallback_text?: {
                    [key: string]: string;
                };
            };
            version?: number;
        };
        ScheduleCampaignDto: {
            /** Format: date-time */
            send_at?: string;
            recurrence?: {
                cron: string;
                until?: string | null;
                timezone?: string;
            };
        };
        SelectWinnerDto: {
            variant_id: string;
        };
        ConversationReplyDto: {
            text?: string;
            template?: {
                name: string;
                language: string;
                header?: {
                    /** @constant */
                    type: "text";
                    text: string;
                } | {
                    /** @enum {string} */
                    type: "image" | "video" | "document";
                    url: string;
                    filename?: string;
                };
                body_params?: string[];
                button_params?: {
                    index: number;
                    /** @enum {string} */
                    sub_type: "url" | "quick_reply" | "copy_code";
                    value: string;
                }[];
            };
            media?: {
                /** @enum {string} */
                type: "image" | "video" | "document" | "audio";
                url: string;
                filename?: string;
            };
            interactive?: {
                /** @enum {string} */
                type: "button" | "list";
                header?: string;
                footer?: string;
                buttons?: {
                    id: string;
                    title: string;
                }[];
                list?: {
                    button: string;
                    sections: {
                        title?: string;
                        rows: {
                            id: string;
                            title: string;
                            description?: string;
                        }[];
                    }[];
                };
            };
            client_message_id?: string;
            /** @enum {string} */
            source?: "manual" | "canned" | "ai_suggestion";
        };
        ConversationUpdateDto: {
            /** @enum {string} */
            status: "open" | "pending" | "resolved" | "closed";
        };
        ConversationAssignDto: {
            assignee_id?: string | null;
            team_id?: string | null;
        };
        ConversationTagsDto: {
            add?: {
                [key: string]: string;
            };
            remove?: string[];
        };
        CreateKeywordDto: {
            keyword: string;
            /** @enum {string} */
            scope?: "org" | "app";
            channels?: ("sms" | "whatsapp" | "rcs")[];
            actions: {
                add_tags?: {
                    [key: string]: string;
                };
                remove_tags?: string[];
                event?: {
                    name: string;
                    properties?: {
                        [key: string]: string;
                    };
                };
                reply?: {
                    text: string;
                };
                opt_in?: boolean;
            };
            enabled?: boolean;
            description?: string;
        };
        UpdateKeywordDto: {
            keyword?: string;
            channels?: ("sms" | "whatsapp" | "rcs")[];
            actions?: {
                add_tags?: {
                    [key: string]: string;
                };
                remove_tags?: string[];
                event?: {
                    name: string;
                    properties?: {
                        [key: string]: string;
                    };
                };
                reply?: {
                    text: string;
                };
                opt_in?: boolean;
            };
            enabled?: boolean;
            description?: string | null;
        };
        SdkChatIdentifyDto: {
            visitor_id: string;
            visitor_token: string;
            external_id?: string;
            identity_hash?: string;
            subscription_id?: string;
            token_hash?: string;
            name?: string;
            /** Format: email */
            email?: string;
            language?: string;
        };
        SdkChatSendDto: {
            visitor_id: string;
            visitor_token: string;
            client_message_id: string;
            text: string;
            option_id?: string;
            name?: string;
            /** Format: email */
            email?: string;
            language?: string;
            page_url?: string;
        };
        SdkChatTypingDto: {
            visitor_id: string;
            visitor_token: string;
            typing: boolean;
        };
        SdkChatAckDto: {
            visitor_id: string;
            visitor_token: string;
            read_seq?: number;
            delivered_seq?: number;
        };
        SdkChatOfflineDto: {
            visitor_id: string;
            visitor_token: string;
            client_message_id: string;
            /** Format: email */
            email: string;
            name?: string;
            text: string;
            language?: string;
        };
        CannedInputDto: {
            shortcut: string;
            title: string;
            body: string;
            language?: string | null;
        };
        CannedUpdateDto: {
            shortcut?: string;
            title?: string;
            body?: string;
            language?: string | null;
        };
        InboxSettingsUpdateDto: {
            widget?: {
                enabled?: boolean;
                color?: string;
                text_color?: string;
                /** @enum {string} */
                position?: "right" | "left";
                /** @enum {string} */
                theme?: "light" | "dark" | "auto";
                title?: {
                    [key: string]: string;
                };
                greeting?: {
                    [key: string]: string;
                };
                offline_message?: {
                    [key: string]: string;
                };
                collect_email_offline?: boolean;
                attachments?: boolean;
                require_email?: boolean;
            };
            business_hours?: {
                enabled?: boolean;
                timezone?: string | null;
                days?: {
                    day: number;
                    start: string;
                    end: string;
                }[];
                holidays?: string[];
            };
            routing?: {
                auto_assign?: boolean;
                /** @enum {string} */
                visibility?: "all" | "team" | "assigned";
                show_unassigned?: boolean;
                first_response_sla_seconds?: number;
                max_concurrent_default?: number | null;
            };
            email?: {
                capture_replies?: boolean;
            };
        };
        DeliverabilitySettingsDto: {
            bcc_address?: string | null;
            validation?: {
                enabled: boolean;
                check_mx?: boolean;
                block_disposable?: boolean;
                block_role?: boolean;
            };
            verifier?: {
                provider: ("zerobounce" | "neverbounce" | "mock") | null;
                api_key?: string;
            };
        };
        VerifyAddressDto: {
            address: string;
        };
        CreateWarmupPlanDto: {
            name: string;
            /** @enum {string} */
            kind: "domain" | "ip";
            target: string;
            start_date?: string;
            daily_limits?: number[];
            curve?: {
                start: number;
                growth: number;
                target: number;
            };
            provider_shares?: {
                gmail: number;
                outlook: number;
                yahoo: number;
                other: number;
            };
            timezone?: string;
        };
        UpdateWarmupPlanDto: {
            name?: string;
            /** @enum {string} */
            status?: "active" | "paused";
            daily_limits?: number[];
            provider_shares?: {
                gmail: number;
                outlook: number;
                yahoo: number;
                other: number;
            } | null;
        };
        CreateSuppressionDto: {
            /** @enum {string} */
            channel: "email" | "sms" | "whatsapp" | "rcs";
            value: string;
            /** @enum {string} */
            reason?: "manual" | "bounce" | "complaint" | "unsubscribe_link" | "stop";
            /** Format: date-time */
            expires_at?: string;
            note?: string;
        };
        SdkInAppEventDto: {
            subscription_id: string;
            token_hash?: string;
            /** @enum {string} */
            type: "impression" | "click" | "dismiss";
            button_id?: string;
            variant_id?: string;
        };
        SdkInboxActionDto: {
            subscription_id: string;
            identity_hash?: string;
            token_hash?: string;
        };
        CreateInAppDto: {
            name: string;
            triggers: ({
                /** @constant */
                kind: "session_start";
            } | {
                /** @constant */
                kind: "session_duration";
                seconds: number;
            } | {
                /** @constant */
                kind: "event";
                name: string;
            } | {
                /** @constant */
                kind: "screen";
                name: string;
            } | {
                /** @constant */
                kind: "trigger";
                key: string;
                /** @enum {string} */
                op: "eq" | "neq" | "exists" | "gt" | "lt";
                value?: string | number;
            })[];
            trigger_groups?: ({
                /** @constant */
                kind: "session_start";
            } | {
                /** @constant */
                kind: "session_duration";
                seconds: number;
            } | {
                /** @constant */
                kind: "event";
                name: string;
            } | {
                /** @constant */
                kind: "screen";
                name: string;
            } | {
                /** @constant */
                kind: "trigger";
                key: string;
                /** @enum {string} */
                op: "eq" | "neq" | "exists" | "gt" | "lt";
                value?: string | number;
            })[][];
            variants?: {
                id: string;
                name: string;
                weight_percent: number;
                display: {
                    /** @enum {string} */
                    layout: "modal" | "banner_top" | "banner_bottom" | "fullscreen";
                    background_color?: string;
                    text_color?: string;
                    dismissible?: boolean;
                    auto_dismiss_seconds?: number;
                    /** @enum {string} */
                    content_type?: "blocks" | "html";
                    html?: {
                        [key: string]: string;
                    };
                    html_height?: number;
                    blocks: ({
                        /** @constant */
                        type: "image";
                        url: string;
                        alt?: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "title";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "body";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "button";
                        id: string;
                        text: {
                            [key: string]: string;
                        };
                        action: {
                            /** @constant */
                            type: "dismiss";
                        } | {
                            /** @constant */
                            type: "push_prompt";
                        } | {
                            /** @constant */
                            type: "outcome";
                            name: string;
                            value?: number;
                        } | {
                            /** @constant */
                            type: "url";
                            url: string;
                        } | {
                            /** @constant */
                            type: "deeplink";
                            url: string;
                        } | {
                            /** @constant */
                            type: "tags";
                            tags: {
                                [key: string]: string;
                            };
                        };
                        background_color?: string;
                        text_color?: string;
                    } | {
                        /** @constant */
                        type: "carousel";
                        id: string;
                        cards: {
                            id: string;
                            title: {
                                [key: string]: string;
                            };
                            body?: {
                                [key: string]: string;
                            };
                            image_url?: string;
                            image_alt?: {
                                [key: string]: string;
                            };
                            button?: {
                                id: string;
                                text: {
                                    [key: string]: string;
                                };
                                action: {
                                    /** @constant */
                                    type: "dismiss";
                                } | {
                                    /** @constant */
                                    type: "push_prompt";
                                } | {
                                    /** @constant */
                                    type: "outcome";
                                    name: string;
                                    value?: number;
                                } | {
                                    /** @constant */
                                    type: "url";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "deeplink";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "tags";
                                    tags: {
                                        [key: string]: string;
                                    };
                                };
                            };
                        }[];
                    })[];
                };
            }[];
            ab_test?: {
                winner?: {
                    /** @enum {string} */
                    mode: "manual" | "auto";
                    min_impressions?: number;
                    confidence?: number;
                };
            };
            display: {
                /** @enum {string} */
                layout: "modal" | "banner_top" | "banner_bottom" | "fullscreen";
                background_color?: string;
                text_color?: string;
                dismissible?: boolean;
                auto_dismiss_seconds?: number;
                /** @enum {string} */
                content_type?: "blocks" | "html";
                html?: {
                    [key: string]: string;
                };
                html_height?: number;
                blocks: ({
                    /** @constant */
                    type: "image";
                    url: string;
                    alt?: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "title";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "body";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "button";
                    id: string;
                    text: {
                        [key: string]: string;
                    };
                    action: {
                        /** @constant */
                        type: "dismiss";
                    } | {
                        /** @constant */
                        type: "push_prompt";
                    } | {
                        /** @constant */
                        type: "outcome";
                        name: string;
                        value?: number;
                    } | {
                        /** @constant */
                        type: "url";
                        url: string;
                    } | {
                        /** @constant */
                        type: "deeplink";
                        url: string;
                    } | {
                        /** @constant */
                        type: "tags";
                        tags: {
                            [key: string]: string;
                        };
                    };
                    background_color?: string;
                    text_color?: string;
                } | {
                    /** @constant */
                    type: "carousel";
                    id: string;
                    cards: {
                        id: string;
                        title: {
                            [key: string]: string;
                        };
                        body?: {
                            [key: string]: string;
                        };
                        image_url?: string;
                        image_alt?: {
                            [key: string]: string;
                        };
                        button?: {
                            id: string;
                            text: {
                                [key: string]: string;
                            };
                            action: {
                                /** @constant */
                                type: "dismiss";
                            } | {
                                /** @constant */
                                type: "push_prompt";
                            } | {
                                /** @constant */
                                type: "outcome";
                                name: string;
                                value?: number;
                            } | {
                                /** @constant */
                                type: "url";
                                url: string;
                            } | {
                                /** @constant */
                                type: "deeplink";
                                url: string;
                            } | {
                                /** @constant */
                                type: "tags";
                                tags: {
                                    [key: string]: string;
                                };
                            };
                        };
                    }[];
                })[];
            };
            audience?: {
                included_segments?: string[];
                excluded_segments?: string[];
            };
            frequency?: {
                max_impressions?: number;
                min_interval_seconds?: number;
                stop_after_interaction?: boolean;
            };
            journey_only?: boolean;
            priority?: number;
            start_at?: string | null;
            end_at?: string | null;
        };
        UpdateInAppDto: {
            name?: string;
            triggers?: ({
                /** @constant */
                kind: "session_start";
            } | {
                /** @constant */
                kind: "session_duration";
                seconds: number;
            } | {
                /** @constant */
                kind: "event";
                name: string;
            } | {
                /** @constant */
                kind: "screen";
                name: string;
            } | {
                /** @constant */
                kind: "trigger";
                key: string;
                /** @enum {string} */
                op: "eq" | "neq" | "exists" | "gt" | "lt";
                value?: string | number;
            })[];
            trigger_groups?: ({
                /** @constant */
                kind: "session_start";
            } | {
                /** @constant */
                kind: "session_duration";
                seconds: number;
            } | {
                /** @constant */
                kind: "event";
                name: string;
            } | {
                /** @constant */
                kind: "screen";
                name: string;
            } | {
                /** @constant */
                kind: "trigger";
                key: string;
                /** @enum {string} */
                op: "eq" | "neq" | "exists" | "gt" | "lt";
                value?: string | number;
            })[][];
            variants?: {
                id: string;
                name: string;
                weight_percent: number;
                display: {
                    /** @enum {string} */
                    layout: "modal" | "banner_top" | "banner_bottom" | "fullscreen";
                    background_color?: string;
                    text_color?: string;
                    dismissible?: boolean;
                    auto_dismiss_seconds?: number;
                    /** @enum {string} */
                    content_type?: "blocks" | "html";
                    html?: {
                        [key: string]: string;
                    };
                    html_height?: number;
                    blocks: ({
                        /** @constant */
                        type: "image";
                        url: string;
                        alt?: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "title";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "body";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "button";
                        id: string;
                        text: {
                            [key: string]: string;
                        };
                        action: {
                            /** @constant */
                            type: "dismiss";
                        } | {
                            /** @constant */
                            type: "push_prompt";
                        } | {
                            /** @constant */
                            type: "outcome";
                            name: string;
                            value?: number;
                        } | {
                            /** @constant */
                            type: "url";
                            url: string;
                        } | {
                            /** @constant */
                            type: "deeplink";
                            url: string;
                        } | {
                            /** @constant */
                            type: "tags";
                            tags: {
                                [key: string]: string;
                            };
                        };
                        background_color?: string;
                        text_color?: string;
                    } | {
                        /** @constant */
                        type: "carousel";
                        id: string;
                        cards: {
                            id: string;
                            title: {
                                [key: string]: string;
                            };
                            body?: {
                                [key: string]: string;
                            };
                            image_url?: string;
                            image_alt?: {
                                [key: string]: string;
                            };
                            button?: {
                                id: string;
                                text: {
                                    [key: string]: string;
                                };
                                action: {
                                    /** @constant */
                                    type: "dismiss";
                                } | {
                                    /** @constant */
                                    type: "push_prompt";
                                } | {
                                    /** @constant */
                                    type: "outcome";
                                    name: string;
                                    value?: number;
                                } | {
                                    /** @constant */
                                    type: "url";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "deeplink";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "tags";
                                    tags: {
                                        [key: string]: string;
                                    };
                                };
                            };
                        }[];
                    })[];
                };
            }[];
            ab_test?: {
                winner?: {
                    /** @enum {string} */
                    mode: "manual" | "auto";
                    min_impressions?: number;
                    confidence?: number;
                };
            };
            display?: {
                /** @enum {string} */
                layout: "modal" | "banner_top" | "banner_bottom" | "fullscreen";
                background_color?: string;
                text_color?: string;
                dismissible?: boolean;
                auto_dismiss_seconds?: number;
                /** @enum {string} */
                content_type?: "blocks" | "html";
                html?: {
                    [key: string]: string;
                };
                html_height?: number;
                blocks: ({
                    /** @constant */
                    type: "image";
                    url: string;
                    alt?: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "title";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "body";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "button";
                    id: string;
                    text: {
                        [key: string]: string;
                    };
                    action: {
                        /** @constant */
                        type: "dismiss";
                    } | {
                        /** @constant */
                        type: "push_prompt";
                    } | {
                        /** @constant */
                        type: "outcome";
                        name: string;
                        value?: number;
                    } | {
                        /** @constant */
                        type: "url";
                        url: string;
                    } | {
                        /** @constant */
                        type: "deeplink";
                        url: string;
                    } | {
                        /** @constant */
                        type: "tags";
                        tags: {
                            [key: string]: string;
                        };
                    };
                    background_color?: string;
                    text_color?: string;
                } | {
                    /** @constant */
                    type: "carousel";
                    id: string;
                    cards: {
                        id: string;
                        title: {
                            [key: string]: string;
                        };
                        body?: {
                            [key: string]: string;
                        };
                        image_url?: string;
                        image_alt?: {
                            [key: string]: string;
                        };
                        button?: {
                            id: string;
                            text: {
                                [key: string]: string;
                            };
                            action: {
                                /** @constant */
                                type: "dismiss";
                            } | {
                                /** @constant */
                                type: "push_prompt";
                            } | {
                                /** @constant */
                                type: "outcome";
                                name: string;
                                value?: number;
                            } | {
                                /** @constant */
                                type: "url";
                                url: string;
                            } | {
                                /** @constant */
                                type: "deeplink";
                                url: string;
                            } | {
                                /** @constant */
                                type: "tags";
                                tags: {
                                    [key: string]: string;
                                };
                            };
                        };
                    }[];
                })[];
            };
            audience?: {
                included_segments?: string[];
                excluded_segments?: string[];
            };
            frequency?: {
                max_impressions?: number;
                min_interval_seconds?: number;
                stop_after_interaction?: boolean;
            };
            journey_only?: boolean;
            priority?: number;
            start_at?: string | null;
            end_at?: string | null;
        };
        InAppStatusDto: {
            /** @enum {string} */
            status: "draft" | "active" | "paused" | "archived";
        };
        InAppWinnerDto: {
            variant_id: string;
        };
        CreateCategoryDto: {
            key: string;
            name: {
                [key: string]: string;
            };
            description?: {
                [key: string]: string;
            };
            channels?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[] | null;
            default_opted_in?: boolean;
            position?: number;
        };
        UpdateCategoryDto: {
            name?: {
                [key: string]: string;
            };
            description?: {
                [key: string]: string;
            };
            channels?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[] | null;
            default_opted_in?: boolean;
            position?: number;
        };
        SetPreferencesDto: {
            preferences: {
                category: string;
                channel?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs") | null;
                opted_in: boolean;
            }[];
        };
        SdkSetPreferencesDto: {
            preferences: {
                category: string;
                channel?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs") | null;
                opted_in: boolean;
            }[];
            subscription_id: string;
            token_hash?: string;
            identity_hash?: string;
        };
        UpdateJourneyDto: {
            name?: string;
            description?: string | null;
        };
        UpdateNodeDto: {
            data?: {
                [key: string]: unknown;
            };
            position?: {
                x: number;
                y: number;
            };
        };
        TriggerRunDto: {
            external_id?: string;
            user_id?: string;
            alias?: {
                label: string;
                value: string;
            };
            context?: {
                [key: string]: unknown;
            };
        };
        ZapierSubscribeDto: {
            target_url: string;
            /** @enum {string} */
            event: "subscription.created" | "subscription.unsubscribed" | "event.received" | "delivery.delivered" | "delivery.opened" | "delivery.clicked" | "user.created" | "user.updated" | "conversion.created" | "campaign.completed";
            event_name?: string;
        };
        CreateAdAudienceDto: {
            ad_account_id: string;
            /** @enum {string} */
            source: "segment" | "journey";
            segment_id?: string;
            name: string;
            description?: string;
            identifiers?: ("email" | "phone" | "maid")[];
            sync_interval_minutes?: number;
        };
        UpdateAdAudienceDto: {
            name?: string;
            description?: string | null;
            segment_id?: string;
            identifiers?: ("email" | "phone" | "maid")[];
            sync_interval_minutes?: number;
            /** @enum {string} */
            status?: "active" | "paused";
        };
        SyncAdAudienceDto: {
            full?: boolean;
        };
        CreateLookalikeDto: {
            name?: string;
            country: string;
            ratio: number;
        };
        UpdateAdCampaignDto: {
            /** @enum {string} */
            status?: "active" | "paused";
            daily_budget?: string | number;
        };
        CreateBudgetAlertRuleDto: {
            name: string;
            /** @enum {string} */
            kind: "daily_spend" | "roas_drop" | "budget_depletion";
            ad_account_id?: string | null;
            campaign_external_id?: string | null;
            threshold: number;
            window_days?: number;
            recipients?: string[];
            enabled?: boolean;
        };
        UpdateBudgetAlertRuleDto: {
            name?: string;
            ad_account_id?: string | null;
            campaign_external_id?: string | null;
            threshold?: number;
            window_days?: number;
            recipients?: string[];
            enabled?: boolean;
        };
        SdkAttributionDto: {
            subscription_id?: string;
            token_hash?: string;
            identity_hash?: string;
            external_id?: string;
            touches: {
                touch_id: string;
                /** Format: date-time */
                occurred_at: string;
                utm_source?: string;
                utm_medium?: string;
                utm_campaign?: string;
                utm_term?: string;
                utm_content?: string;
                utm_id?: string;
                /** @enum {string} */
                click_id_type?: "fbclid" | "gclid" | "gbraid" | "wbraid" | "ttclid" | "li_fat_id" | "msclkid";
                click_id?: string;
                landing_url?: string;
                referrer?: string;
            }[];
        };
        SdkWebCampaignEventDto: {
            /** @enum {string} */
            type: "impression" | "click" | "close" | "conversion";
            visitor_id: string;
            variant_id?: string;
            button_id?: string;
            subscription_id?: string;
            token_hash?: string;
        };
        SdkFormSubmitDto: {
            values: {
                [key: string]: string | boolean | number | string[];
            };
            visitor_id?: string;
            subscription_id?: string;
            token_hash?: string;
            identity_hash?: string;
            web_campaign_id?: string;
            page_url?: string;
            language?: string;
            website?: string;
            elapsed_ms?: number;
        };
        SdkSurveyResponseDto: {
            answers: {
                [key: string]: string | boolean | number | string[];
            };
            visitor_id?: string;
            subscription_id?: string;
            token_hash?: string;
            web_campaign_id?: string;
        };
        CreateWebCampaignDto: {
            name: string;
            display: {
                /** @enum {string} */
                layout: "popup" | "banner_top" | "banner_bottom" | "slide_in" | "fullscreen";
                /** @enum {string} */
                position?: "left" | "right";
                background_color?: string;
                text_color?: string;
                dismissible?: boolean;
                auto_dismiss_seconds?: number;
                max_width?: number;
                blocks: ({
                    /** @constant */
                    type: "image";
                    url: string;
                    alt?: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "title";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "body";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "button";
                    id: string;
                    text: {
                        [key: string]: string;
                    };
                    action: {
                        /** @constant */
                        type: "dismiss";
                    } | {
                        /** @constant */
                        type: "url";
                        url: string;
                        new_tab?: boolean;
                    } | {
                        /** @constant */
                        type: "push_prompt";
                    } | {
                        /** @constant */
                        type: "outcome";
                        name: string;
                        value?: number;
                    } | {
                        /** @constant */
                        type: "tags";
                        tags: {
                            [key: string]: string;
                        };
                    };
                    background_color?: string;
                    text_color?: string;
                })[];
                form_id?: string | null;
                survey_id?: string | null;
            };
            variants?: {
                id: string;
                name: string;
                weight_percent: number;
                display: {
                    /** @enum {string} */
                    layout: "popup" | "banner_top" | "banner_bottom" | "slide_in" | "fullscreen";
                    /** @enum {string} */
                    position?: "left" | "right";
                    background_color?: string;
                    text_color?: string;
                    dismissible?: boolean;
                    auto_dismiss_seconds?: number;
                    max_width?: number;
                    blocks: ({
                        /** @constant */
                        type: "image";
                        url: string;
                        alt?: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "title";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "body";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "button";
                        id: string;
                        text: {
                            [key: string]: string;
                        };
                        action: {
                            /** @constant */
                            type: "dismiss";
                        } | {
                            /** @constant */
                            type: "url";
                            url: string;
                            new_tab?: boolean;
                        } | {
                            /** @constant */
                            type: "push_prompt";
                        } | {
                            /** @constant */
                            type: "outcome";
                            name: string;
                            value?: number;
                        } | {
                            /** @constant */
                            type: "tags";
                            tags: {
                                [key: string]: string;
                            };
                        };
                        background_color?: string;
                        text_color?: string;
                    })[];
                    form_id?: string | null;
                    survey_id?: string | null;
                };
            }[];
            trigger: {
                /** @constant */
                kind: "page_load";
                delay_seconds?: number;
            } | {
                /** @constant */
                kind: "time_on_page";
                seconds: number;
            } | {
                /** @constant */
                kind: "scroll_depth";
                percent: number;
            } | {
                /** @constant */
                kind: "exit_intent";
            };
            conditions?: {
                url_rules?: {
                    /** @enum {string} */
                    op: "equals" | "contains" | "starts_with" | "not_contains" | "matches";
                    value: string;
                }[];
                utm_rules?: {
                    /** @enum {string} */
                    param: "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content";
                    /** @enum {string} */
                    op: "equals" | "contains" | "exists";
                    value?: string;
                }[];
                visits?: {
                    /** @enum {string} */
                    op: "gte" | "lte" | "eq";
                    value: number;
                };
            };
            targeting?: {
                included_segments?: string[];
                excluded_segments?: string[];
                /** @enum {string} */
                visitor?: "all" | "new" | "returning";
                devices?: ("desktop" | "mobile" | "tablet")[];
            };
            frequency?: {
                max_per_session?: number;
                max_per_day?: number;
                max_total?: number;
                hide_after_close_days?: number;
                stop_after_conversion?: boolean;
            };
            priority?: number;
            start_at?: string | null;
            end_at?: string | null;
        };
        UpdateWebCampaignDto: {
            name?: string;
            display?: {
                /** @enum {string} */
                layout: "popup" | "banner_top" | "banner_bottom" | "slide_in" | "fullscreen";
                /** @enum {string} */
                position?: "left" | "right";
                background_color?: string;
                text_color?: string;
                dismissible?: boolean;
                auto_dismiss_seconds?: number;
                max_width?: number;
                blocks: ({
                    /** @constant */
                    type: "image";
                    url: string;
                    alt?: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "title";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "body";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "button";
                    id: string;
                    text: {
                        [key: string]: string;
                    };
                    action: {
                        /** @constant */
                        type: "dismiss";
                    } | {
                        /** @constant */
                        type: "url";
                        url: string;
                        new_tab?: boolean;
                    } | {
                        /** @constant */
                        type: "push_prompt";
                    } | {
                        /** @constant */
                        type: "outcome";
                        name: string;
                        value?: number;
                    } | {
                        /** @constant */
                        type: "tags";
                        tags: {
                            [key: string]: string;
                        };
                    };
                    background_color?: string;
                    text_color?: string;
                })[];
                form_id?: string | null;
                survey_id?: string | null;
            };
            variants?: {
                id: string;
                name: string;
                weight_percent: number;
                display: {
                    /** @enum {string} */
                    layout: "popup" | "banner_top" | "banner_bottom" | "slide_in" | "fullscreen";
                    /** @enum {string} */
                    position?: "left" | "right";
                    background_color?: string;
                    text_color?: string;
                    dismissible?: boolean;
                    auto_dismiss_seconds?: number;
                    max_width?: number;
                    blocks: ({
                        /** @constant */
                        type: "image";
                        url: string;
                        alt?: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "title";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "body";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "button";
                        id: string;
                        text: {
                            [key: string]: string;
                        };
                        action: {
                            /** @constant */
                            type: "dismiss";
                        } | {
                            /** @constant */
                            type: "url";
                            url: string;
                            new_tab?: boolean;
                        } | {
                            /** @constant */
                            type: "push_prompt";
                        } | {
                            /** @constant */
                            type: "outcome";
                            name: string;
                            value?: number;
                        } | {
                            /** @constant */
                            type: "tags";
                            tags: {
                                [key: string]: string;
                            };
                        };
                        background_color?: string;
                        text_color?: string;
                    })[];
                    form_id?: string | null;
                    survey_id?: string | null;
                };
            }[];
            trigger?: {
                /** @constant */
                kind: "page_load";
                delay_seconds?: number;
            } | {
                /** @constant */
                kind: "time_on_page";
                seconds: number;
            } | {
                /** @constant */
                kind: "scroll_depth";
                percent: number;
            } | {
                /** @constant */
                kind: "exit_intent";
            };
            conditions?: {
                url_rules?: {
                    /** @enum {string} */
                    op: "equals" | "contains" | "starts_with" | "not_contains" | "matches";
                    value: string;
                }[];
                utm_rules?: {
                    /** @enum {string} */
                    param: "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content";
                    /** @enum {string} */
                    op: "equals" | "contains" | "exists";
                    value?: string;
                }[];
                visits?: {
                    /** @enum {string} */
                    op: "gte" | "lte" | "eq";
                    value: number;
                };
            };
            targeting?: {
                included_segments?: string[];
                excluded_segments?: string[];
                /** @enum {string} */
                visitor?: "all" | "new" | "returning";
                devices?: ("desktop" | "mobile" | "tablet")[];
            };
            frequency?: {
                max_per_session?: number;
                max_per_day?: number;
                max_total?: number;
                hide_after_close_days?: number;
                stop_after_conversion?: boolean;
            };
            priority?: number;
            start_at?: string | null;
            end_at?: string | null;
        };
        WebCampaignStatusDto: {
            /** @enum {string} */
            status: "draft" | "active" | "paused" | "archived";
        };
        CreateFormDto: {
            name: string;
            fields: {
                id: string;
                /** @enum {string} */
                type: "email" | "phone" | "first_name" | "last_name" | "full_name" | "text" | "textarea" | "select" | "radio" | "checkbox" | "consent";
                label: {
                    [key: string]: string;
                };
                placeholder?: {
                    [key: string]: string;
                };
                required?: boolean;
                options?: {
                    value: string;
                    label: {
                        [key: string]: string;
                    };
                }[];
                maps_to?: string;
                max_length?: number;
                policy_url?: string;
            }[];
            settings?: {
                submit_label?: {
                    [key: string]: string;
                };
                success_message?: {
                    [key: string]: string;
                };
                redirect_url?: string;
                tags?: {
                    [key: string]: string;
                };
                subscribe?: {
                    email?: boolean;
                    sms?: boolean;
                };
                double_opt_in?: {
                    enabled: boolean;
                    subject?: {
                        [key: string]: string;
                    };
                    body?: {
                        [key: string]: string;
                    };
                };
                event_name?: string;
                captcha?: boolean;
                default_language?: string;
            };
            /** @enum {string} */
            status?: "active" | "archived";
        };
        PublicFormSubmitDto: {
            values: {
                [key: string]: string | boolean | number | string[];
            };
            external_id?: string;
            page_url?: string;
            language?: string;
        };
        CreateSurveyDto: {
            name: string;
            questions: {
                id: string;
                /** @enum {string} */
                type: "nps" | "csat" | "single_choice" | "multiple_choice" | "text";
                text: {
                    [key: string]: string;
                };
                required?: boolean;
                options?: {
                    value: string;
                    label: {
                        [key: string]: string;
                    };
                }[];
                low_label?: {
                    [key: string]: string;
                };
                high_label?: {
                    [key: string]: string;
                };
                placeholder?: {
                    [key: string]: string;
                };
            }[];
            settings?: {
                thank_you?: {
                    [key: string]: string;
                };
                submit_label?: {
                    [key: string]: string;
                };
                write_properties?: boolean;
                allow_multiple?: boolean;
                default_language?: string;
            };
        };
        SurveyStatusDto: {
            /** @enum {string} */
            status: "draft" | "active" | "closed";
        };
        PublicSurveyResponseDto: {
            answers: {
                [key: string]: string | boolean | number | string[];
            };
            external_id?: string;
        };
        Account: {
            id: string;
            email: string;
            name: string;
            locale: string;
            timezone: string;
            email_verified: boolean;
            mfa_enabled: boolean;
            is_platform_admin: boolean;
            has_password: boolean;
            marketing_opt_in: boolean;
            created_at: string;
        };
        Me: {
            account: {
                id: string;
                email: string;
                name: string;
                locale: string;
                timezone: string;
                email_verified: boolean;
                mfa_enabled: boolean;
                is_platform_admin: boolean;
                has_password: boolean;
                marketing_opt_in: boolean;
                created_at: string;
            };
            memberships: {
                org_id: string;
                org_name: string;
                org_slug: string;
                /** @enum {string} */
                role: "owner" | "admin" | "developer" | "marketer" | "analyst" | "billing" | "viewer" | "composer" | "agent";
                app_scopes: string[];
                mfa_required: boolean;
            }[];
            admin_mfa_required: boolean;
            mock_providers_available: boolean;
        };
        LoginResult: {
            mfa_required: boolean;
            mfa_token?: string;
            account?: {
                id: string;
                email: string;
                name: string;
                locale: string;
                timezone: string;
                email_verified: boolean;
                mfa_enabled: boolean;
                is_platform_admin: boolean;
                has_password: boolean;
                marketing_opt_in: boolean;
                created_at: string;
            };
        };
        MfaSetup: {
            secret: string;
            otpauth_uri: string;
        };
        RecoveryCodes: {
            recovery_codes: string[];
        };
        SessionList: {
            data: {
                id: string;
                ip: string | null;
                user_agent: string | null;
                created_at: string;
                last_seen_at: string;
                expires_at: string;
                current: boolean;
            }[];
        };
        Ok: {
            /** @constant */
            ok: true;
        };
        AuthConfig: {
            turnstile_site_key: string | null;
        };
        AccountExport: {
            format_version: number;
            generated_at: string;
            account: {
                id: string;
                email: string;
                name: string;
                locale: string;
                timezone: string;
                status: string;
                email_verified_at: string | null;
                has_password: boolean;
                mfa_enabled: boolean;
                is_platform_admin: boolean;
                last_login_at: string | null;
                created_at: string;
                updated_at: string;
            };
            consents: {
                terms_accepted_at: string | null;
                terms_version: string | null;
                marketing_opt_in: boolean;
                marketing_opt_in_at: string | null;
            };
            memberships: {
                org_id: string;
                org_name: string;
                org_slug: string;
                role: string;
                is_primary_owner: boolean;
                app_scopes: string[];
                joined_at: string;
            }[];
            sessions: {
                id: string;
                ip: string | null;
                user_agent: string | null;
                auth_method: string;
                persistent: boolean;
                created_at: string;
                last_seen_at: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            identities: {
                provider: string;
                provider_user_id: string;
                email: string | null;
                created_at: string;
            }[];
            mfa_factors: {
                type: string;
                verified_at: string | null;
                last_used_at: string | null;
                created_at: string;
            }[];
            oauth_grants: {
                client_name: string;
                org_id: string;
                app_id: string | null;
                scopes: string[];
                created_at: string;
                revoked_at: string | null;
            }[];
            audit_entries: {
                org_id: string;
                app_id: string | null;
                action: string;
                target_type: string | null;
                target_id: string | null;
                metadata: {
                    [key: string]: unknown;
                };
                ip: string | null;
                created_at: string;
            }[];
        };
        ChannelConfig: {
            /** @enum {string} */
            channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
            provider: ("apns" | "fcm" | "hms" | "webpush" | "smtp" | "ses" | "resend" | "twilio" | "netgsm" | "meta_whatsapp" | "google_rbm" | "mock") | null;
            /** @enum {string} */
            status: "unconfigured" | "active" | "invalid" | "suspended";
            config: {
                /** @enum {string} */
                auth_type?: "token" | "certificate";
                /** @enum {string} */
                certificate_environment?: "sandbox" | "production" | "universal";
                certificate_subject?: string;
                certificate_expires_at?: string;
                key_id?: string;
                team_id?: string;
                bundle_id?: string;
                /** @enum {string} */
                environment?: "sandbox" | "production";
                project_id?: string;
                client_email?: string;
                hms_app_id?: string;
                high_priority?: boolean;
                subject?: string;
                vapid_public_key?: string;
                site_url?: string;
                from_address?: string;
                from_name?: string;
                reply_to?: string;
                dkim_selector?: string;
                postal_address?: string;
                host?: string;
                port?: number;
                secure?: boolean;
                username?: string;
                region?: string;
                access_key_id?: string;
                configuration_set?: string;
                account_sid?: string;
                from_number?: string;
                messaging_service_sid?: string;
                usercode?: string;
                msgheader?: string;
                /** @enum {string} */
                iys_filter?: "0" | "11" | "12";
                waba_id?: string;
                phone_number_id?: string;
                graph_api_version?: string;
                display_phone_number?: string;
                verified_name?: string;
                rbm_agent_id?: string;
                content_sid?: string;
                sms_fallback?: boolean;
            };
            has_secret: boolean;
            has_hook: boolean;
            last_validated_at: string | null;
            last_error: string | null;
            updated_at: string | null;
            suspended_reason: string | null;
            dns_check: {
                domain: string;
                checked_at: string;
                spf: {
                    ok: boolean;
                    record: string | null;
                    expected: string;
                };
                dkim: {
                    ok: boolean;
                    selector: string;
                    record: string | null;
                    expected: string;
                };
                dmarc: {
                    ok: boolean;
                    record: string | null;
                    expected: string;
                };
                issues: string[];
            } | null;
        };
        ChannelStatusList: {
            data: {
                channel: string;
                provider: string | null;
                status: string;
            }[];
        };
        ChannelList: {
            data: {
                /** @enum {string} */
                channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                provider: ("apns" | "fcm" | "hms" | "webpush" | "smtp" | "ses" | "resend" | "twilio" | "netgsm" | "meta_whatsapp" | "google_rbm" | "mock") | null;
                /** @enum {string} */
                status: "unconfigured" | "active" | "invalid" | "suspended";
                config: {
                    /** @enum {string} */
                    auth_type?: "token" | "certificate";
                    /** @enum {string} */
                    certificate_environment?: "sandbox" | "production" | "universal";
                    certificate_subject?: string;
                    certificate_expires_at?: string;
                    key_id?: string;
                    team_id?: string;
                    bundle_id?: string;
                    /** @enum {string} */
                    environment?: "sandbox" | "production";
                    project_id?: string;
                    client_email?: string;
                    hms_app_id?: string;
                    high_priority?: boolean;
                    subject?: string;
                    vapid_public_key?: string;
                    site_url?: string;
                    from_address?: string;
                    from_name?: string;
                    reply_to?: string;
                    dkim_selector?: string;
                    postal_address?: string;
                    host?: string;
                    port?: number;
                    secure?: boolean;
                    username?: string;
                    region?: string;
                    access_key_id?: string;
                    configuration_set?: string;
                    account_sid?: string;
                    from_number?: string;
                    messaging_service_sid?: string;
                    usercode?: string;
                    msgheader?: string;
                    /** @enum {string} */
                    iys_filter?: "0" | "11" | "12";
                    waba_id?: string;
                    phone_number_id?: string;
                    graph_api_version?: string;
                    display_phone_number?: string;
                    verified_name?: string;
                    rbm_agent_id?: string;
                    content_sid?: string;
                    sms_fallback?: boolean;
                };
                has_secret: boolean;
                has_hook: boolean;
                last_validated_at: string | null;
                last_error: string | null;
                updated_at: string | null;
                suspended_reason: string | null;
                dns_check: {
                    domain: string;
                    checked_at: string;
                    spf: {
                        ok: boolean;
                        record: string | null;
                        expected: string;
                    };
                    dkim: {
                        ok: boolean;
                        selector: string;
                        record: string | null;
                        expected: string;
                    };
                    dmarc: {
                        ok: boolean;
                        record: string | null;
                        expected: string;
                    };
                    issues: string[];
                } | null;
            }[];
        };
        ChannelValidation: {
            ok: boolean;
            kind: ("auth" | "config" | "transient") | null;
            code: string | null;
            message: string | null;
            details: {
                [key: string]: unknown;
            } | null;
            channel: {
                /** @enum {string} */
                channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                provider: ("apns" | "fcm" | "hms" | "webpush" | "smtp" | "ses" | "resend" | "twilio" | "netgsm" | "meta_whatsapp" | "google_rbm" | "mock") | null;
                /** @enum {string} */
                status: "unconfigured" | "active" | "invalid" | "suspended";
                config: {
                    /** @enum {string} */
                    auth_type?: "token" | "certificate";
                    /** @enum {string} */
                    certificate_environment?: "sandbox" | "production" | "universal";
                    certificate_subject?: string;
                    certificate_expires_at?: string;
                    key_id?: string;
                    team_id?: string;
                    bundle_id?: string;
                    /** @enum {string} */
                    environment?: "sandbox" | "production";
                    project_id?: string;
                    client_email?: string;
                    hms_app_id?: string;
                    high_priority?: boolean;
                    subject?: string;
                    vapid_public_key?: string;
                    site_url?: string;
                    from_address?: string;
                    from_name?: string;
                    reply_to?: string;
                    dkim_selector?: string;
                    postal_address?: string;
                    host?: string;
                    port?: number;
                    secure?: boolean;
                    username?: string;
                    region?: string;
                    access_key_id?: string;
                    configuration_set?: string;
                    account_sid?: string;
                    from_number?: string;
                    messaging_service_sid?: string;
                    usercode?: string;
                    msgheader?: string;
                    /** @enum {string} */
                    iys_filter?: "0" | "11" | "12";
                    waba_id?: string;
                    phone_number_id?: string;
                    graph_api_version?: string;
                    display_phone_number?: string;
                    verified_name?: string;
                    rbm_agent_id?: string;
                    content_sid?: string;
                    sms_fallback?: boolean;
                };
                has_secret: boolean;
                has_hook: boolean;
                last_validated_at: string | null;
                last_error: string | null;
                updated_at: string | null;
                suspended_reason: string | null;
                dns_check: {
                    domain: string;
                    checked_at: string;
                    spf: {
                        ok: boolean;
                        record: string | null;
                        expected: string;
                    };
                    dkim: {
                        ok: boolean;
                        selector: string;
                        record: string | null;
                        expected: string;
                    };
                    dmarc: {
                        ok: boolean;
                        record: string | null;
                        expected: string;
                    };
                    issues: string[];
                } | null;
            };
        };
        ChannelHook: {
            url: string | null;
            provider: string;
            polling: boolean;
            events: string[];
            verify_token?: string | null;
        };
        Segment: {
            id: string;
            app_id: string;
            name: string;
            description: string | null;
            definition: {
                [key: string]: unknown;
            };
            is_dynamic: boolean;
            estimated_count: number | null;
            estimated_at: string | null;
            created_by: string | null;
            created_at: string;
            updated_at: string;
        };
        SegmentPage: {
            data: {
                id: string;
                app_id: string;
                name: string;
                description: string | null;
                definition: {
                    [key: string]: unknown;
                };
                is_dynamic: boolean;
                estimated_count: number | null;
                estimated_at: string | null;
                created_by: string | null;
                created_at: string;
                updated_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        SegmentEstimate: {
            segment_id: string | null;
            subscriptions: number;
            users: number;
            estimated_at: string;
            cached: boolean;
            sampled: boolean;
        };
        SegmentCampaigns: {
            data: {
                id: string;
                name: string;
                status: string;
                type: string;
                /** @enum {string} */
                usage: "include" | "exclude";
                created_at: string;
            }[];
        };
        SegmentPreview: {
            subscriptions: number;
            users: number;
            sampled: boolean;
            sample: {
                id: string;
                external_id: string | null;
                tags: {
                    [key: string]: string;
                };
                last_active_at: string;
            }[];
        };
        CleanupResult: {
            deleted: number;
        };
        Subscription: {
            id: string;
            app_id: string;
            user_id: string | null;
            /** @enum {string} */
            channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
            token: string;
            /** @enum {string} */
            status: "subscribed" | "unsubscribed" | "invalid" | "pending";
            unsubscribe_reason: ("provider_rejected" | "user_opt_out" | "api" | "uninstall") | null;
            device: {
                model?: string;
                os?: string;
                os_version?: string;
                app_version?: string | null;
                sdk_version?: string;
                sdk_platform?: string;
                carrier?: string;
                locale?: string;
                timezone?: string;
                push_capable?: boolean;
                /** @enum {string} */
                push_environment?: "sandbox" | "production";
            };
            test_device: boolean;
            test_device_name: string | null;
            last_active_at: string;
            last_sent_at: string | null;
            last_delivered_at: string | null;
            opted_in_at: string | null;
            opt_in_source: string | null;
            unsubscribed_at: string | null;
            location: {
                lat: number;
                lng: number;
                accuracy_m: number | null;
                geohash: string | null;
                updated_at: string | null;
                consent_at: string | null;
            } | null;
            created_at: string;
        };
        User: {
            id: string;
            app_id: string;
            external_id: string | null;
            properties: {
                [key: string]: unknown;
            };
            tags: {
                [key: string]: string;
            };
            first_seen_at: string;
            last_active_at: string;
            session_count: number;
            usage_seconds: number;
            merged_into: string | null;
            created_at: string;
            updated_at: string;
            subscription_count: number;
            channels: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
        };
        UserDetail: {
            id: string;
            app_id: string;
            external_id: string | null;
            properties: {
                [key: string]: unknown;
            };
            tags: {
                [key: string]: string;
            };
            first_seen_at: string;
            last_active_at: string;
            session_count: number;
            usage_seconds: number;
            merged_into: string | null;
            created_at: string;
            updated_at: string;
            subscription_count: number;
            channels: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
            aliases: {
                label: string;
                value: string;
            }[];
            subscriptions: {
                id: string;
                app_id: string;
                user_id: string | null;
                /** @enum {string} */
                channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                token: string;
                /** @enum {string} */
                status: "subscribed" | "unsubscribed" | "invalid" | "pending";
                unsubscribe_reason: ("provider_rejected" | "user_opt_out" | "api" | "uninstall") | null;
                device: {
                    model?: string;
                    os?: string;
                    os_version?: string;
                    app_version?: string | null;
                    sdk_version?: string;
                    sdk_platform?: string;
                    carrier?: string;
                    locale?: string;
                    timezone?: string;
                    push_capable?: boolean;
                    /** @enum {string} */
                    push_environment?: "sandbox" | "production";
                };
                test_device: boolean;
                test_device_name: string | null;
                last_active_at: string;
                last_sent_at: string | null;
                last_delivered_at: string | null;
                opted_in_at: string | null;
                opt_in_source: string | null;
                unsubscribed_at: string | null;
                location: {
                    lat: number;
                    lng: number;
                    accuracy_m: number | null;
                    geohash: string | null;
                    updated_at: string | null;
                    consent_at: string | null;
                } | null;
                created_at: string;
            }[];
        };
        UserList: {
            data: {
                id: string;
                app_id: string;
                external_id: string | null;
                properties: {
                    [key: string]: unknown;
                };
                tags: {
                    [key: string]: string;
                };
                first_seen_at: string;
                last_active_at: string;
                session_count: number;
                usage_seconds: number;
                merged_into: string | null;
                created_at: string;
                updated_at: string;
                subscription_count: number;
                channels: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        SubscriptionList: {
            data: {
                id: string;
                app_id: string;
                user_id: string | null;
                /** @enum {string} */
                channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                token: string;
                /** @enum {string} */
                status: "subscribed" | "unsubscribed" | "invalid" | "pending";
                unsubscribe_reason: ("provider_rejected" | "user_opt_out" | "api" | "uninstall") | null;
                device: {
                    model?: string;
                    os?: string;
                    os_version?: string;
                    app_version?: string | null;
                    sdk_version?: string;
                    sdk_platform?: string;
                    carrier?: string;
                    locale?: string;
                    timezone?: string;
                    push_capable?: boolean;
                    /** @enum {string} */
                    push_environment?: "sandbox" | "production";
                };
                test_device: boolean;
                test_device_name: string | null;
                last_active_at: string;
                last_sent_at: string | null;
                last_delivered_at: string | null;
                opted_in_at: string | null;
                opt_in_source: string | null;
                unsubscribed_at: string | null;
                location: {
                    lat: number;
                    lng: number;
                    accuracy_m: number | null;
                    geohash: string | null;
                    updated_at: string | null;
                    consent_at: string | null;
                } | null;
                created_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        EventList: {
            data: {
                id: string;
                user_id: string | null;
                subscription_id: string | null;
                name: string;
                properties: {
                    [key: string]: unknown;
                };
                value: number | null;
                /** @enum {string} */
                source: "sdk" | "api" | "system" | "import";
                occurred_at: string;
            }[];
        };
        UserExport: {
            exported_at: string;
            user: {
                id: string;
                app_id: string;
                external_id: string | null;
                properties: {
                    [key: string]: unknown;
                };
                tags: {
                    [key: string]: string;
                };
                first_seen_at: string;
                last_active_at: string;
                session_count: number;
                usage_seconds: number;
                merged_into: string | null;
                created_at: string;
                updated_at: string;
                subscription_count: number;
                channels: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
                aliases: {
                    label: string;
                    value: string;
                }[];
                subscriptions: {
                    id: string;
                    app_id: string;
                    user_id: string | null;
                    /** @enum {string} */
                    channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                    token: string;
                    /** @enum {string} */
                    status: "subscribed" | "unsubscribed" | "invalid" | "pending";
                    unsubscribe_reason: ("provider_rejected" | "user_opt_out" | "api" | "uninstall") | null;
                    device: {
                        model?: string;
                        os?: string;
                        os_version?: string;
                        app_version?: string | null;
                        sdk_version?: string;
                        sdk_platform?: string;
                        carrier?: string;
                        locale?: string;
                        timezone?: string;
                        push_capable?: boolean;
                        /** @enum {string} */
                        push_environment?: "sandbox" | "production";
                    };
                    test_device: boolean;
                    test_device_name: string | null;
                    last_active_at: string;
                    last_sent_at: string | null;
                    last_delivered_at: string | null;
                    opted_in_at: string | null;
                    opt_in_source: string | null;
                    unsubscribed_at: string | null;
                    location: {
                        lat: number;
                        lng: number;
                        accuracy_m: number | null;
                        geohash: string | null;
                        updated_at: string | null;
                        consent_at: string | null;
                    } | null;
                    created_at: string;
                }[];
            };
            events: {
                id: string;
                user_id: string | null;
                subscription_id: string | null;
                name: string;
                properties: {
                    [key: string]: unknown;
                };
                value: number | null;
                /** @enum {string} */
                source: "sdk" | "api" | "system" | "import";
                occurred_at: string;
            }[];
        };
        UserIdentity: {
            identity: {
                [key: string]: string;
            };
        };
        EventsAccepted: {
            accepted: number;
        };
        SdkRegisterResult: {
            subscription_id: string;
            user_id: string;
            external_id: string | null;
            /** @enum {string} */
            status: "subscribed" | "unsubscribed" | "invalid" | "pending";
            created: boolean;
        };
        SdkUserResult: {
            user_id: string;
            external_id: string | null;
            tags: {
                [key: string]: string;
            };
        };
        SdkConfig: {
            app_id: string;
            name: string;
            api_url: string;
            cell_id: string | null;
            identity_verification_required: boolean;
            /** @enum {string} */
            identity_verification_mode: "hmac" | "jwt" | "both";
            platforms: {
                ios: boolean;
                android: boolean;
                web: boolean;
                email: boolean;
                sms: boolean;
            };
            web: {
                vapid_public_key: string | null;
                allowed_origins: string[];
                service_worker_path: string | null;
                service_worker_scope: string | null;
                prompt: {
                    enabled: boolean;
                    /** @enum {string} */
                    type: "slidedown" | "native";
                    /** @enum {string} */
                    collect?: "push" | "email" | "sms" | "email_sms";
                    delaySeconds?: number;
                    pageViews?: number;
                    scrollPercent?: number;
                    texts?: {
                        [key: string]: {
                            title?: string;
                            message?: string;
                            accept?: string;
                            cancel?: string;
                        };
                    };
                    categories?: {
                        tag: string;
                        label: {
                            [key: string]: string;
                        };
                    }[];
                    accentColor?: string;
                } | null;
                welcome_notification: {
                    enabled: boolean;
                    url?: string;
                    texts?: {
                        [key: string]: {
                            title?: string;
                            message?: string;
                        };
                    };
                } | null;
                click_behavior: {
                    /** @enum {string} */
                    match: "exact" | "origin";
                    /** @enum {string} */
                    action: "navigate" | "focus";
                } | null;
                custom_link: {
                    enabled: boolean;
                    /** @enum {string} */
                    style: "button" | "link";
                    /** @enum {string} */
                    size: "small" | "medium" | "large";
                    color?: {
                        button?: string;
                        text?: string;
                    };
                    texts?: {
                        [key: string]: {
                            subscribe?: string;
                            unsubscribe?: string;
                            explanation?: string;
                        };
                    };
                    unsubscribeEnabled?: boolean;
                } | null;
                prompt_backoff_days: number[] | null;
            };
            session: {
                timeout_seconds: number;
            };
            in_app: {
                min_interval_seconds: number;
            };
            android_channels: {
                id: string;
                name: string;
                description: string | null;
                /** @enum {string} */
                importance: "low" | "default" | "high" | "urgent";
                sound: string | null;
                vibration: boolean;
                group: string | null;
            }[];
            categories: {
                key: string;
                name: {
                    [key: string]: string;
                };
                description: {
                    [key: string]: string;
                };
                channels: string[] | null;
                default_opted_in: boolean;
            }[];
        };
        SdkSecret: {
            sdk_secret: string;
            identity_verification_required: boolean;
        };
        SdkIdentityResult: {
            identity: {
                [key: string]: string;
            };
        };
        EstimateAudienceResult: {
            recipients: number;
            by_channel: {
                [key: string]: number;
            };
            new_contacts: number;
            external_id_missing: string[];
        };
        Message: {
            id: string;
            app_id: string;
            /** @enum {string} */
            source: "campaign" | "api" | "journey" | "test";
            /** @enum {string} */
            status: "queued" | "processing" | "completed" | "cancelled" | "failed";
            idempotency_key: string | null;
            name: string | null;
            content: {
                [key: string]: unknown;
            };
            target: {
                [key: string]: unknown;
            };
            options: {
                [key: string]: unknown;
            };
            labels: string[];
            category: string | null;
            template_id: string | null;
            campaign_id: string | null;
            variants: {
                id: string;
                name: string;
                weight_percent: number;
                is_control: boolean;
            }[] | null;
            counts: {
                targeted?: number;
                suppressed?: number;
                sent?: number;
                delivered?: number;
                failed?: number;
                errored?: number;
                expired?: number;
                opened?: number;
                clicked?: number;
                converted?: number;
                bounced?: number;
                complained?: number;
                unsubscribed?: number;
                sms_segments?: number;
            };
            requested_by: {
                /** @enum {string} */
                type: "api_key" | "account" | "system";
                id?: string;
            };
            error: string | null;
            scheduled_for: string | null;
            started_at: string | null;
            completed_at: string | null;
            created_at: string;
            updated_at: string;
        };
        MessageList: {
            data: {
                id: string;
                app_id: string;
                /** @enum {string} */
                source: "campaign" | "api" | "journey" | "test";
                /** @enum {string} */
                status: "queued" | "processing" | "completed" | "cancelled" | "failed";
                idempotency_key: string | null;
                name: string | null;
                content: {
                    [key: string]: unknown;
                };
                target: {
                    [key: string]: unknown;
                };
                options: {
                    [key: string]: unknown;
                };
                labels: string[];
                category: string | null;
                template_id: string | null;
                campaign_id: string | null;
                variants: {
                    id: string;
                    name: string;
                    weight_percent: number;
                    is_control: boolean;
                }[] | null;
                counts: {
                    targeted?: number;
                    suppressed?: number;
                    sent?: number;
                    delivered?: number;
                    failed?: number;
                    errored?: number;
                    expired?: number;
                    opened?: number;
                    clicked?: number;
                    converted?: number;
                    bounced?: number;
                    complained?: number;
                    unsubscribed?: number;
                    sms_segments?: number;
                };
                requested_by: {
                    /** @enum {string} */
                    type: "api_key" | "account" | "system";
                    id?: string;
                };
                error: string | null;
                scheduled_for: string | null;
                started_at: string | null;
                completed_at: string | null;
                created_at: string;
                updated_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        CreateNotificationResult: {
            id: string;
            /** @enum {string} */
            status: "queued" | "processing" | "completed" | "cancelled" | "failed";
            recipients_estimate: number;
            external_id_missing: string[];
        };
        Delivery: {
            id: string;
            message_id: string;
            subscription_id: string;
            user_id: string | null;
            /** @enum {string} */
            channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
            provider: string | null;
            /** @enum {string} */
            status: "pending" | "sent" | "delivered" | "failed" | "bounced" | "suppressed" | "expired" | "cancelled";
            attempt_count: number;
            provider_message_id: string | null;
            error_code: string | null;
            error_message: string | null;
            suppression_reason: string | null;
            send_after: string | null;
            sent_at: string | null;
            delivered_at: string | null;
            opened_at: string | null;
            clicked_at: string | null;
            failed_at: string | null;
            created_at: string;
        };
        DeliveryList: {
            data: {
                id: string;
                message_id: string;
                subscription_id: string;
                user_id: string | null;
                /** @enum {string} */
                channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                provider: string | null;
                /** @enum {string} */
                status: "pending" | "sent" | "delivered" | "failed" | "bounced" | "suppressed" | "expired" | "cancelled";
                attempt_count: number;
                provider_message_id: string | null;
                error_code: string | null;
                error_message: string | null;
                suppression_reason: string | null;
                send_after: string | null;
                sent_at: string | null;
                delivered_at: string | null;
                opened_at: string | null;
                clicked_at: string | null;
                failed_at: string | null;
                created_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        TraceResult: {
            query: string;
            kind: string;
            items: {
                delivery: {
                    id: string;
                    message_id: string;
                    subscription_id: string;
                    user_id: string | null;
                    /** @enum {string} */
                    channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                    provider: string | null;
                    /** @enum {string} */
                    status: "pending" | "sent" | "delivered" | "failed" | "bounced" | "suppressed" | "expired" | "cancelled";
                    attempt_count: number;
                    provider_message_id: string | null;
                    error_code: string | null;
                    error_message: string | null;
                    suppression_reason: string | null;
                    send_after: string | null;
                    sent_at: string | null;
                    delivered_at: string | null;
                    opened_at: string | null;
                    clicked_at: string | null;
                    failed_at: string | null;
                    created_at: string;
                };
                events: {
                    id: string;
                    type: string;
                    detail: {
                        [key: string]: unknown;
                    };
                    occurred_at: string;
                }[];
                subscription: {
                    id: string;
                    /** @enum {string} */
                    channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                    status: string;
                    token_suffix: string;
                    device: {
                        [key: string]: unknown;
                    };
                    test_device: boolean;
                } | null;
                user: {
                    id: string;
                    external_id: string | null;
                } | null;
                render: {
                    language: string | null;
                    title: string | null;
                    body: string | null;
                    url: string | null;
                    image_url: string | null;
                    buttons: string[];
                    hash: string | null;
                    matches_sent: boolean | null;
                    error: string | null;
                } | null;
                webhooks: {
                    id: string;
                    endpoint_id: string;
                    event_type: string;
                    status: string;
                    attempt: number;
                    response_status: number | null;
                    created_at: string;
                }[];
                message: {
                    id: string;
                    source: string;
                    status: string;
                    created_at: string;
                } | null;
            }[];
        };
        OverviewStats: {
            /** @enum {string} */
            range: "7d" | "30d" | "custom";
            from: string;
            to: string;
            kpis: {
                sent: number;
                delivered: number;
                failed: number;
                opened: number;
                clicked: number;
                delivery_rate: number | null;
                open_rate: number | null;
                click_rate: number | null;
                active_subscriptions: number;
                new_subscriptions: number;
                opt_outs: number;
            };
            series: {
                date: string;
                sent: number;
                delivered: number;
                failed: number;
                opened: number;
            }[];
            recent_messages: {
                id: string;
                app_id: string;
                /** @enum {string} */
                source: "campaign" | "api" | "journey" | "test";
                /** @enum {string} */
                status: "queued" | "processing" | "completed" | "cancelled" | "failed";
                idempotency_key: string | null;
                name: string | null;
                content: {
                    [key: string]: unknown;
                };
                target: {
                    [key: string]: unknown;
                };
                options: {
                    [key: string]: unknown;
                };
                labels: string[];
                category: string | null;
                template_id: string | null;
                campaign_id: string | null;
                variants: {
                    id: string;
                    name: string;
                    weight_percent: number;
                    is_control: boolean;
                }[] | null;
                counts: {
                    targeted?: number;
                    suppressed?: number;
                    sent?: number;
                    delivered?: number;
                    failed?: number;
                    errored?: number;
                    expired?: number;
                    opened?: number;
                    clicked?: number;
                    converted?: number;
                    bounced?: number;
                    complained?: number;
                    unsubscribed?: number;
                    sms_segments?: number;
                };
                requested_by: {
                    /** @enum {string} */
                    type: "api_key" | "account" | "system";
                    id?: string;
                };
                error: string | null;
                scheduled_for: string | null;
                started_at: string | null;
                completed_at: string | null;
                created_at: string;
                updated_at: string;
            }[];
            recent_campaigns: {
                id: string;
                name: string;
                type: string;
                status: string;
                sent: number;
                opened: number;
                clicked: number;
                updated_at: string;
            }[];
            top_errors: {
                code: string;
                count: number;
            }[];
            channels: {
                /** @enum {string} */
                channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                provider: ("apns" | "fcm" | "hms" | "webpush" | "smtp" | "ses" | "resend" | "twilio" | "netgsm" | "meta_whatsapp" | "google_rbm" | "mock") | null;
                /** @enum {string} */
                status: "unconfigured" | "active" | "invalid" | "suspended";
                last_error: string | null;
                active_subscriptions: number;
            }[];
        };
        MessagesReport: {
            from: string;
            to: string;
            /** @enum {string} */
            group_by: "day" | "channel" | "campaign";
            totals: {
                sent: number;
                delivered: number;
                failed: number;
                opened: number;
                clicked: number;
                converted: number;
                delivery_rate: number | null;
                open_rate: number | null;
                click_rate: number | null;
            };
            previous: {
                sent: number;
                delivered: number;
                failed: number;
                opened: number;
                clicked: number;
                converted: number;
                delivery_rate: number | null;
                open_rate: number | null;
                click_rate: number | null;
            } | null;
            rows: {
                key: string;
                label: string;
                sent: number;
                delivered: number;
                failed: number;
                opened: number;
                clicked: number;
                converted: number;
            }[];
        };
        SubscriptionsReport: {
            from: string;
            to: string;
            totals: {
                active: number;
                new: number;
                unsubscribed: number;
                opt_outs: number;
                net: number;
            };
            previous: {
                active: number;
                new: number;
                unsubscribed: number;
                opt_outs: number;
                net: number;
            } | null;
            rows: {
                date: string;
                new: number;
                unsubscribed: number;
                opt_outs: number;
                net: number;
            }[];
            by_channel: {
                channel: string;
                active: number;
                new: number;
                unsubscribed: number;
            }[];
        };
        EventsReport: {
            from: string;
            to: string;
            /** @enum {string} */
            group_by: "day" | "name";
            name: string | null;
            totals: {
                count: number;
                users: number;
            };
            previous: {
                count: number;
                users: number;
            } | null;
            rows: {
                key: string;
                count: number;
                users: number;
            }[];
        };
        ConversionsReport: {
            from: string;
            to: string;
            totals: {
                conversions: number;
                direct: number;
                influenced: number;
                unattributed: number;
                revenue: number;
            };
            previous: {
                conversions: number;
                direct: number;
                influenced: number;
                unattributed: number;
                revenue: number;
            } | null;
            by_campaign: {
                campaign_id: string | null;
                name: string;
                conversions: number;
                direct: number;
                influenced: number;
                unattributed: number;
                revenue: number;
                sent: number;
                conversion_rate: number | null;
            }[];
            rows: {
                date: string;
                conversions: number;
                revenue: number;
            }[];
        };
        FunnelReport: {
            from: string;
            to: string;
            window_hours: number;
            steps: {
                name: string;
                users: number;
                conversion_rate: number | null;
                drop_off: number;
            }[];
            overall_rate: number | null;
            previous: {
                steps: number[];
                overall_rate: number | null;
            } | null;
        };
        ProvidersReport: {
            from: string;
            to: string;
            totals: {
                sent: number;
                failed: number;
                failure_rate: number | null;
            };
            previous: {
                sent: number;
                failed: number;
                failure_rate: number | null;
            } | null;
            rows: {
                channel: string;
                provider: string | null;
                sent: number;
                failed: number;
                failure_rate: number | null;
                latency_p50_ms: number | null;
                latency_p95_ms: number | null;
                errors: {
                    code: string;
                    count: number;
                }[];
            }[];
        };
        EngagementReport: {
            from: string;
            to: string;
            timezone: string;
            totals: {
                opened: number;
                clicked: number;
            };
            previous: {
                opened: number;
                clicked: number;
            } | null;
            cells: {
                weekday: number;
                hour: number;
                opened: number;
                clicked: number;
            }[];
            rows: {
                date: string;
                opened: number;
                clicked: number;
            }[];
        };
        RetentionReport: {
            weeks: number;
            cohorts: {
                week: string;
                users: number;
                retention: (number | null)[];
            }[];
            average: (number | null)[];
        };
        IdentityKey: {
            id: string;
            kid: string;
            /** @constant */
            alg: "ES256";
            public_jwk: {
                [key: string]: string;
            };
            label: string | null;
            created_at: string;
            revoked_at: string | null;
        };
        IdentityKeyList: {
            data: {
                id: string;
                kid: string;
                /** @constant */
                alg: "ES256";
                public_jwk: {
                    [key: string]: string;
                };
                label: string | null;
                created_at: string;
                revoked_at: string | null;
            }[];
        };
        Org: {
            id: string;
            name: string;
            slug: string;
            plan_code: string;
            /** @enum {string} */
            status: "active" | "suspended" | "deleted";
            settings: {
                mfaRequired?: boolean;
                ipAllowlist?: string[];
                retentionDays?: number;
                sessionMaxHours?: number;
                auditStream?: {
                    s3?: boolean;
                    webhookAppId?: string | null;
                };
            };
            created_at: string;
            region: string | null;
            managed_by_reseller: boolean;
        };
        OrgList: {
            data: {
                id: string;
                name: string;
                slug: string;
                plan_code: string;
                /** @enum {string} */
                status: "active" | "suspended" | "deleted";
                settings: {
                    mfaRequired?: boolean;
                    ipAllowlist?: string[];
                    retentionDays?: number;
                    sessionMaxHours?: number;
                    auditStream?: {
                        s3?: boolean;
                        webhookAppId?: string | null;
                    };
                };
                created_at: string;
                region: string | null;
                managed_by_reseller: boolean;
                /** @enum {string} */
                role: "owner" | "admin" | "developer" | "marketer" | "analyst" | "billing" | "viewer" | "composer" | "agent";
                app_scopes: string[];
            }[];
        };
        Member: {
            id: string;
            account_id: string;
            email: string;
            name: string;
            /** @enum {string} */
            role: "owner" | "admin" | "developer" | "marketer" | "analyst" | "billing" | "viewer" | "composer" | "agent";
            app_scopes: string[];
            accepted_at: string | null;
            created_at: string;
            last_login_at: string | null;
        };
        MemberList: {
            data: {
                id: string;
                account_id: string;
                email: string;
                name: string;
                /** @enum {string} */
                role: "owner" | "admin" | "developer" | "marketer" | "analyst" | "billing" | "viewer" | "composer" | "agent";
                app_scopes: string[];
                accepted_at: string | null;
                created_at: string;
                last_login_at: string | null;
            }[];
        };
        Invite: {
            id: string;
            email: string;
            /** @enum {string} */
            role: "owner" | "admin" | "developer" | "marketer" | "analyst" | "billing" | "viewer" | "composer" | "agent";
            expires_at: string;
            invited_by: string | null;
            created_at: string;
        };
        InviteList: {
            data: {
                id: string;
                email: string;
                /** @enum {string} */
                role: "owner" | "admin" | "developer" | "marketer" | "analyst" | "billing" | "viewer" | "composer" | "agent";
                expires_at: string;
                invited_by: string | null;
                created_at: string;
            }[];
        };
        InvitePreview: {
            org_name: string;
            email: string;
            /** @enum {string} */
            role: "owner" | "admin" | "developer" | "marketer" | "analyst" | "billing" | "viewer" | "composer" | "agent";
            expires_at: string;
            inviter_name: string | null;
        };
        AcceptInviteResult: {
            org_id: string;
            org_slug: string;
            /** @enum {string} */
            role: "owner" | "admin" | "developer" | "marketer" | "analyst" | "billing" | "viewer" | "composer" | "agent";
        };
        App: {
            id: string;
            org_id: string;
            name: string;
            slug: string;
            platform_flags: {
                ios?: boolean;
                android?: boolean;
                web?: boolean;
                email?: boolean;
                sms?: boolean;
            };
            icon_url: string | null;
            default_language: string;
            timezone: string;
            settings: {
                quietHours?: {
                    start: string;
                    end: string;
                    /** @enum {string} */
                    timezoneMode: "user" | "app";
                } | null;
                frequencyCap?: {
                    max: number;
                    windowHours: number;
                } | null;
                frequencyCaps?: {
                    max: number;
                    window: {
                        value: number;
                        /** @enum {string} */
                        unit: "minutes" | "hours" | "days" | "weeks";
                    };
                    channels?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
                }[];
                inApp?: {
                    minIntervalSeconds?: number;
                };
                androidChannels?: {
                    id: string;
                    name: string;
                    description?: string;
                    /** @enum {string} */
                    importance: "low" | "default" | "high" | "urgent";
                    sound?: string;
                    vibration?: boolean;
                    group?: string;
                }[];
                sms?: {
                    helpReply?: string;
                    stopReply?: string;
                    autoReply?: boolean;
                };
                preferenceCenter?: {
                    enabled?: boolean;
                    brandName?: string;
                    logoUrl?: string;
                    accentColor?: string;
                    customUnsubscribeUrl?: string;
                    texts?: {
                        [key: string]: {
                            title?: string;
                            description?: string;
                            unsubscribeAll?: string;
                            saved?: string;
                        };
                    };
                };
                defaultTtlSeconds?: number;
                identityVerificationRequired?: boolean;
                allowedOrigins?: string[];
                campaignApprovalRequired?: boolean;
                webPush?: {
                    serviceWorkerPath?: string;
                    serviceWorkerScope?: string;
                    prompt?: {
                        enabled: boolean;
                        /** @enum {string} */
                        type: "slidedown" | "native";
                        /** @enum {string} */
                        collect?: "push" | "email" | "sms" | "email_sms";
                        delaySeconds?: number;
                        pageViews?: number;
                        scrollPercent?: number;
                        texts?: {
                            [key: string]: {
                                title?: string;
                                message?: string;
                                accept?: string;
                                cancel?: string;
                            };
                        };
                        categories?: {
                            tag: string;
                            label: {
                                [key: string]: string;
                            };
                        }[];
                        accentColor?: string;
                    };
                    welcomeNotification?: {
                        enabled: boolean;
                        url?: string;
                        texts?: {
                            [key: string]: {
                                title?: string;
                                message?: string;
                            };
                        };
                    };
                    clickBehavior?: {
                        /** @enum {string} */
                        match: "exact" | "origin";
                        /** @enum {string} */
                        action: "navigate" | "focus";
                    };
                    customLink?: {
                        enabled: boolean;
                        /** @enum {string} */
                        style: "button" | "link";
                        /** @enum {string} */
                        size: "small" | "medium" | "large";
                        color?: {
                            button?: string;
                            text?: string;
                        };
                        texts?: {
                            [key: string]: {
                                subscribe?: string;
                                unsubscribe?: string;
                                explanation?: string;
                            };
                        };
                        unsubscribeEnabled?: boolean;
                    };
                    promptBackoffDays?: number[];
                };
                onboarding?: {
                    step: number;
                    simulation?: boolean;
                    completed_at?: string | null;
                    version?: number;
                    platforms?: ("ios" | "android" | "huawei" | "web")[];
                    /** @enum {string} */
                    framework?: "native" | "flutter" | "react-native" | "unity" | "capacitor" | "cordova" | "maui";
                    /** @enum {string} */
                    web_integration?: "code" | "wordpress";
                };
                sdkSetup?: {
                    version: number;
                    platform: string | null;
                    step: string;
                    furthest: string;
                    variant?: string | null;
                    detectedSubscriptionId?: string | null;
                    testMessageId?: string | null;
                    completedAt?: string | null;
                } | null;
            };
            /** @enum {string} */
            identity_verification_mode: "hmac" | "jwt" | "both";
            /** @enum {string} */
            status: "active" | "suspended" | "deleted";
            created_at: string;
            updated_at: string;
        };
        AppList: {
            data: {
                id: string;
                org_id: string;
                name: string;
                slug: string;
                platform_flags: {
                    ios?: boolean;
                    android?: boolean;
                    web?: boolean;
                    email?: boolean;
                    sms?: boolean;
                };
                icon_url: string | null;
                default_language: string;
                timezone: string;
                settings: {
                    quietHours?: {
                        start: string;
                        end: string;
                        /** @enum {string} */
                        timezoneMode: "user" | "app";
                    } | null;
                    frequencyCap?: {
                        max: number;
                        windowHours: number;
                    } | null;
                    frequencyCaps?: {
                        max: number;
                        window: {
                            value: number;
                            /** @enum {string} */
                            unit: "minutes" | "hours" | "days" | "weeks";
                        };
                        channels?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
                    }[];
                    inApp?: {
                        minIntervalSeconds?: number;
                    };
                    androidChannels?: {
                        id: string;
                        name: string;
                        description?: string;
                        /** @enum {string} */
                        importance: "low" | "default" | "high" | "urgent";
                        sound?: string;
                        vibration?: boolean;
                        group?: string;
                    }[];
                    sms?: {
                        helpReply?: string;
                        stopReply?: string;
                        autoReply?: boolean;
                    };
                    preferenceCenter?: {
                        enabled?: boolean;
                        brandName?: string;
                        logoUrl?: string;
                        accentColor?: string;
                        customUnsubscribeUrl?: string;
                        texts?: {
                            [key: string]: {
                                title?: string;
                                description?: string;
                                unsubscribeAll?: string;
                                saved?: string;
                            };
                        };
                    };
                    defaultTtlSeconds?: number;
                    identityVerificationRequired?: boolean;
                    allowedOrigins?: string[];
                    campaignApprovalRequired?: boolean;
                    webPush?: {
                        serviceWorkerPath?: string;
                        serviceWorkerScope?: string;
                        prompt?: {
                            enabled: boolean;
                            /** @enum {string} */
                            type: "slidedown" | "native";
                            /** @enum {string} */
                            collect?: "push" | "email" | "sms" | "email_sms";
                            delaySeconds?: number;
                            pageViews?: number;
                            scrollPercent?: number;
                            texts?: {
                                [key: string]: {
                                    title?: string;
                                    message?: string;
                                    accept?: string;
                                    cancel?: string;
                                };
                            };
                            categories?: {
                                tag: string;
                                label: {
                                    [key: string]: string;
                                };
                            }[];
                            accentColor?: string;
                        };
                        welcomeNotification?: {
                            enabled: boolean;
                            url?: string;
                            texts?: {
                                [key: string]: {
                                    title?: string;
                                    message?: string;
                                };
                            };
                        };
                        clickBehavior?: {
                            /** @enum {string} */
                            match: "exact" | "origin";
                            /** @enum {string} */
                            action: "navigate" | "focus";
                        };
                        customLink?: {
                            enabled: boolean;
                            /** @enum {string} */
                            style: "button" | "link";
                            /** @enum {string} */
                            size: "small" | "medium" | "large";
                            color?: {
                                button?: string;
                                text?: string;
                            };
                            texts?: {
                                [key: string]: {
                                    subscribe?: string;
                                    unsubscribe?: string;
                                    explanation?: string;
                                };
                            };
                            unsubscribeEnabled?: boolean;
                        };
                        promptBackoffDays?: number[];
                    };
                    onboarding?: {
                        step: number;
                        simulation?: boolean;
                        completed_at?: string | null;
                        version?: number;
                        platforms?: ("ios" | "android" | "huawei" | "web")[];
                        /** @enum {string} */
                        framework?: "native" | "flutter" | "react-native" | "unity" | "capacitor" | "cordova" | "maui";
                        /** @enum {string} */
                        web_integration?: "code" | "wordpress";
                    };
                    sdkSetup?: {
                        version: number;
                        platform: string | null;
                        step: string;
                        furthest: string;
                        variant?: string | null;
                        detectedSubscriptionId?: string | null;
                        testMessageId?: string | null;
                        completedAt?: string | null;
                    } | null;
                };
                /** @enum {string} */
                identity_verification_mode: "hmac" | "jwt" | "both";
                /** @enum {string} */
                status: "active" | "suspended" | "deleted";
                created_at: string;
                updated_at: string;
            }[];
        };
        Template: {
            id: string;
            app_id: string;
            name: string;
            channel: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs") | null;
            current_version: number;
            tags: string[];
            content: {
                [key: string]: unknown;
            };
            created_by: string | null;
            created_at: string;
            updated_at: string;
        };
        TemplateStats: {
            template_id: string;
            messages: number;
            campaigns: number;
            targeted: number;
            sent: number;
            delivered: number;
            opened: number;
            clicked: number;
            converted: number;
            open_rate: number;
            click_rate: number;
            conversion_rate: number;
            last_used_at: string | null;
        };
        TemplatePage: {
            data: {
                id: string;
                app_id: string;
                name: string;
                channel: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs") | null;
                current_version: number;
                tags: string[];
                content: {
                    [key: string]: unknown;
                };
                created_by: string | null;
                created_at: string;
                updated_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        TemplateVersionList: {
            data: {
                id: string;
                version: number;
                content: {
                    [key: string]: unknown;
                };
                created_by: string | null;
                created_at: string;
            }[];
        };
        RenderPreview: {
            /** @enum {string} */
            channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
            language: string;
            title: string | null;
            subtitle: string | null;
            body: string | null;
            url: string | null;
            image_url: string | null;
            icon_url: string | null;
            buttons: {
                id: string;
                text: string;
                url: string | null;
            }[];
            data: {
                [key: string]: string;
            };
            warnings: string[];
            email?: {
                subject: string;
                preheader: string | null;
                html: string;
                text: string;
            } | null;
            sms?: {
                body: string;
                /** @enum {string} */
                encoding: "gsm7" | "gsm7_tr" | "ucs2";
                characters: number;
                segments: number;
                per_segment: number;
                non_gsm_characters: string[];
                turkish_characters: string[];
            } | null;
        };
        UserMessageList: {
            data: {
                delivery_id: string;
                message_id: string;
                campaign_id: string | null;
                source: string;
                channel: string;
                status: string;
                title: string | null;
                body: string | null;
                error_code: string | null;
                created_at: string;
                sent_at: string | null;
                delivered_at: string | null;
                opened_at: string | null;
                clicked_at: string | null;
            }[];
        };
        Export: {
            id: string;
            app_id: string;
            /** @enum {string} */
            type: "users" | "subscriptions" | "events" | "deliveries" | "message_events";
            filters: {
                /** Format: date-time */
                from?: string;
                /** Format: date-time */
                to?: string;
                name?: string;
                message_id?: string;
                campaign_id?: string;
                status?: string;
                /** @enum {string} */
                channel?: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                segment_id?: string;
            };
            /** @enum {string} */
            status: "pending" | "running" | "completed" | "failed";
            row_count: number | null;
            error: string | null;
            download_url: string | null;
            expires_at: string | null;
            requested_by: string | null;
            created_at: string;
            completed_at: string | null;
        };
        ExportList: {
            data: {
                id: string;
                app_id: string;
                /** @enum {string} */
                type: "users" | "subscriptions" | "events" | "deliveries" | "message_events";
                filters: {
                    /** Format: date-time */
                    from?: string;
                    /** Format: date-time */
                    to?: string;
                    name?: string;
                    message_id?: string;
                    campaign_id?: string;
                    status?: string;
                    /** @enum {string} */
                    channel?: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                    segment_id?: string;
                };
                /** @enum {string} */
                status: "pending" | "running" | "completed" | "failed";
                row_count: number | null;
                error: string | null;
                download_url: string | null;
                expires_at: string | null;
                requested_by: string | null;
                created_at: string;
                completed_at: string | null;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        Import: {
            id: string;
            app_id: string;
            /** @enum {string} */
            type: "onesignal_players" | "csv_users";
            file_name: string | null;
            /** @enum {string} */
            status: "pending" | "running" | "completed" | "failed";
            stats: {
                processed?: number;
                created_users?: number;
                updated_users?: number;
                created_subscriptions?: number;
                skipped?: number;
                errors?: number;
            };
            error: string | null;
            error_report_url: string | null;
            requested_by: string | null;
            created_at: string;
            completed_at: string | null;
        };
        ImportList: {
            data: {
                id: string;
                app_id: string;
                /** @enum {string} */
                type: "onesignal_players" | "csv_users";
                file_name: string | null;
                /** @enum {string} */
                status: "pending" | "running" | "completed" | "failed";
                stats: {
                    processed?: number;
                    created_users?: number;
                    updated_users?: number;
                    created_subscriptions?: number;
                    skipped?: number;
                    errors?: number;
                };
                error: string | null;
                error_report_url: string | null;
                requested_by: string | null;
                created_at: string;
                completed_at: string | null;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        OrgDataExport: {
            data: {
                app_id: string;
                app_name: string;
                export_ids: string[];
            }[];
        };
        AuditEntry: {
            id: string;
            org_id: string;
            app_id: string | null;
            /** @enum {string} */
            actor_type: "account" | "api_key" | "system";
            actor_id: string | null;
            action: string;
            target_type: string | null;
            target_id: string | null;
            metadata: {
                [key: string]: unknown;
            };
            ip: string | null;
            request_id: string | null;
            created_at: string;
        };
        AuditPage: {
            data: {
                id: string;
                org_id: string;
                app_id: string | null;
                /** @enum {string} */
                actor_type: "account" | "api_key" | "system";
                actor_id: string | null;
                action: string;
                target_type: string | null;
                target_id: string | null;
                metadata: {
                    [key: string]: unknown;
                };
                ip: string | null;
                request_id: string | null;
                created_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        AuditActions: {
            actions: string[];
        };
        EventDefinition: {
            id: string;
            app_id: string;
            name: string;
            display_name: string | null;
            properties_schema: {
                [key: string]: string;
            };
            is_conversion: boolean;
            outcome_unique: boolean;
            outcome_unattributed: boolean;
            retention_days: number | null;
            first_seen_at: string;
            last_seen_at: string;
            count_30d: number;
            created_at: string;
            updated_at: string;
        };
        EventDefinitionList: {
            data: {
                id: string;
                app_id: string;
                name: string;
                display_name: string | null;
                properties_schema: {
                    [key: string]: string;
                };
                is_conversion: boolean;
                outcome_unique: boolean;
                outcome_unattributed: boolean;
                retention_days: number | null;
                first_seen_at: string;
                last_seen_at: string;
                count_30d: number;
                created_at: string;
                updated_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        EventDefinitionDetail: {
            id: string;
            app_id: string;
            name: string;
            display_name: string | null;
            properties_schema: {
                [key: string]: string;
            };
            is_conversion: boolean;
            outcome_unique: boolean;
            outcome_unattributed: boolean;
            retention_days: number | null;
            first_seen_at: string;
            last_seen_at: string;
            count_30d: number;
            created_at: string;
            updated_at: string;
            daily: {
                date: string;
                count: number;
                users: number;
            }[];
            properties: {
                key: string;
                type: string;
                values: {
                    value: string;
                    count: number;
                }[];
            }[];
        };
        RecentEvents: {
            data: {
                id: string;
                user_id: string | null;
                subscription_id: string | null;
                name: string;
                properties: {
                    [key: string]: unknown;
                };
                value: number | null;
                /** @enum {string} */
                source: "sdk" | "api" | "system" | "import";
                occurred_at: string;
            }[];
        };
        ApiKey: {
            id: string;
            org_id: string;
            app_id: string | null;
            name: string;
            prefix: string;
            scopes: string[];
            last_used_at: string | null;
            expires_at: string | null;
            revoked_at: string | null;
            ip_allowlist: string[];
            rotated_at: string | null;
            created_by: string | null;
            created_at: string;
        };
        ApiKeyList: {
            data: {
                id: string;
                org_id: string;
                app_id: string | null;
                name: string;
                prefix: string;
                scopes: string[];
                last_used_at: string | null;
                expires_at: string | null;
                revoked_at: string | null;
                ip_allowlist: string[];
                rotated_at: string | null;
                created_by: string | null;
                created_at: string;
            }[];
        };
        CreatedApiKey: {
            id: string;
            org_id: string;
            app_id: string | null;
            name: string;
            prefix: string;
            scopes: string[];
            last_used_at: string | null;
            expires_at: string | null;
            revoked_at: string | null;
            ip_allowlist: string[];
            rotated_at: string | null;
            created_by: string | null;
            created_at: string;
            key: string;
        };
        OrgNotificationList: {
            data: {
                id: string;
                /** @enum {string} */
                kind: "channel_invalid" | "channel_expiring" | "campaign_approval" | "message_failed" | "export_ready" | "import_finished" | "webhook_unhealthy";
                /** @enum {string} */
                severity: "error" | "warning" | "info" | "success";
                app_id: string;
                app_name: string;
                title: string;
                detail: string | null;
                target_id: string | null;
                at: string;
            }[];
        };
        StatusTokenResult: {
            ok: boolean;
        };
        PlanList: {
            data: {
                code: string;
                name: string;
                monthly_price: number;
                currency: string;
                prices?: {
                    USD: number;
                    TRY: number;
                };
                position: number;
                is_public: boolean;
                limits: {
                    subscriptions: number | null;
                    messages_per_month: number | null;
                    api_rps: number | null;
                    members: number | null;
                    apps: number | null;
                    retention_days: number | null;
                    journeys: number | null;
                    segments: number | null;
                    ab_variants: number | null;
                    tags_per_user: number | null;
                    aliases_per_user: number | null;
                    subscriptions_per_user: number | null;
                    report_history_days: number | null;
                    webhooks: number | null;
                    api_keys: number | null;
                    mau?: number | null;
                    emails_per_month?: number | null;
                    sms_per_month?: number | null;
                    whatsapp_conversations_per_month?: number | null;
                    rcs_messages_per_month?: number | null;
                    ai_credits_per_month?: number | null;
                    data_feeds?: number | null;
                    content_tables?: number | null;
                    event_streams?: number | null;
                    warehouse_destinations?: number | null;
                    custom_domains?: number | null;
                };
                features: {
                    journeys: boolean;
                    ab_testing: boolean;
                    email: boolean;
                    sms: boolean;
                    in_app: boolean;
                    approval_flow: boolean;
                    sso: boolean;
                    scim?: boolean;
                    audit_export: boolean;
                    white_label?: boolean;
                    hide_powered_by?: boolean;
                    reseller?: boolean;
                    whatsapp?: boolean;
                    rcs?: boolean;
                    live_activities?: boolean;
                    inbox?: boolean;
                    ai_assistant?: boolean;
                    dynamic_content?: boolean;
                    event_streams?: boolean;
                    warehouse_export?: boolean;
                    custom_domain?: boolean;
                    data_residency?: boolean;
                    priority_support?: boolean;
                    mcp_server?: boolean;
                    overage?: boolean;
                    roles: string[];
                };
                purchasable: boolean;
            }[];
        };
        BillingStatus: {
            org_id: string;
            /** @description stripe | iyzico | mock | none (ödeme sağlayıcısı yapılandırılmamış; checkout/portal 503 döner) */
            provider: string;
            plan: {
                code: string;
                name: string;
                monthly_price: number;
                currency: string;
                prices?: {
                    USD: number;
                    TRY: number;
                };
                position: number;
                is_public: boolean;
                limits: {
                    subscriptions: number | null;
                    messages_per_month: number | null;
                    api_rps: number | null;
                    members: number | null;
                    apps: number | null;
                    retention_days: number | null;
                    journeys: number | null;
                    segments: number | null;
                    ab_variants: number | null;
                    tags_per_user: number | null;
                    aliases_per_user: number | null;
                    subscriptions_per_user: number | null;
                    report_history_days: number | null;
                    webhooks: number | null;
                    api_keys: number | null;
                    mau?: number | null;
                    emails_per_month?: number | null;
                    sms_per_month?: number | null;
                    whatsapp_conversations_per_month?: number | null;
                    rcs_messages_per_month?: number | null;
                    ai_credits_per_month?: number | null;
                    data_feeds?: number | null;
                    content_tables?: number | null;
                    event_streams?: number | null;
                    warehouse_destinations?: number | null;
                    custom_domains?: number | null;
                };
                features: {
                    journeys: boolean;
                    ab_testing: boolean;
                    email: boolean;
                    sms: boolean;
                    in_app: boolean;
                    approval_flow: boolean;
                    sso: boolean;
                    scim?: boolean;
                    audit_export: boolean;
                    white_label?: boolean;
                    hide_powered_by?: boolean;
                    reseller?: boolean;
                    whatsapp?: boolean;
                    rcs?: boolean;
                    live_activities?: boolean;
                    inbox?: boolean;
                    ai_assistant?: boolean;
                    dynamic_content?: boolean;
                    event_streams?: boolean;
                    warehouse_export?: boolean;
                    custom_domain?: boolean;
                    data_residency?: boolean;
                    priority_support?: boolean;
                    mcp_server?: boolean;
                    overage?: boolean;
                    roles: string[];
                };
                purchasable: boolean;
            };
            effective_plan_code: string;
            trialing: boolean;
            trial_ends_at: string | null;
            suspended: boolean;
            suspended_reason: string | null;
            subscription: {
                provider: string;
                plan_code: string;
                status: string;
                current_period_start: string | null;
                current_period_end: string | null;
                cancel_at: string | null;
                cancel_at_period_end: boolean;
                has_customer: boolean;
            } | null;
            billing_info: {
                legalName?: string;
                taxId?: string;
                address?: string;
                city?: string;
                country?: string;
                email?: string;
            } | null;
        };
        InvoiceList: {
            data: {
                id: string;
                provider_invoice_id: string;
                amount: number;
                currency: string;
                status: string;
                pdf_url: string | null;
                hosted_url: string | null;
                period_start: string | null;
                period_end: string | null;
                issued_at: string | null;
            }[];
        };
        CheckoutResult: {
            url: string;
            session_id: string;
        };
        PortalResult: {
            url: string;
        };
        UsageReport: {
            org_id: string;
            plan_code: string;
            period: {
                start: string;
                end: string;
            };
            metrics: {
                metric: string;
                used: number;
                limit: number | null;
                percent: number | null;
                hard: boolean;
            }[];
            apps: {
                app_id: string;
                name: string;
                messages_sent: number;
                active_subscriptions: number;
                mau: number;
            }[];
            daily: {
                date: string;
                messages_sent: number;
                api_requests: number;
                events_ingested: number;
            }[];
            trialing: boolean;
            trial_ends_at: string | null;
            overage?: {
                lines: {
                    metric: string;
                    included: number;
                    used: number;
                    billable: number;
                    amounts: {
                        USD: number;
                        TRY: number;
                    };
                }[];
                totals: {
                    USD: number;
                    TRY: number;
                };
            } | null;
        };
        Conversation: {
            id: string;
            /** @enum {string} */
            channel: "sms" | "whatsapp" | "rcs" | "email" | "chat";
            /** @enum {string} */
            status: "open" | "pending" | "resolved" | "closed";
            subscription_id: string | null;
            subscription_status: string | null;
            user_id: string | null;
            external_id: string | null;
            contact: string;
            opted_in: boolean;
            last_message_at: string;
            last_inbound_at: string | null;
            last_direction: ("inbound" | "outbound") | null;
            last_message_preview: string | null;
            unread_count: number;
            window: {
                open: boolean;
                expires_at: string | null;
            } | null;
            created_at: string;
            assignee_id: string | null;
            team_id: string | null;
            assigned_at: string | null;
            language: string | null;
            bot_active: boolean;
            last_seq: number;
            visitor_last_read_seq: number;
            visitor_last_delivered_seq: number;
            agent_last_read_seq: number;
            waiting_since: string | null;
            first_response_at: string | null;
            sla_due_at: string | null;
            resolved_at: string | null;
            visitor: {
                name: string | null;
                email: string | null;
            } | null;
        };
        ConversationPage: {
            data: {
                id: string;
                /** @enum {string} */
                channel: "sms" | "whatsapp" | "rcs" | "email" | "chat";
                /** @enum {string} */
                status: "open" | "pending" | "resolved" | "closed";
                subscription_id: string | null;
                subscription_status: string | null;
                user_id: string | null;
                external_id: string | null;
                contact: string;
                opted_in: boolean;
                last_message_at: string;
                last_inbound_at: string | null;
                last_direction: ("inbound" | "outbound") | null;
                last_message_preview: string | null;
                unread_count: number;
                window: {
                    open: boolean;
                    expires_at: string | null;
                } | null;
                created_at: string;
                assignee_id: string | null;
                team_id: string | null;
                assigned_at: string | null;
                language: string | null;
                bot_active: boolean;
                last_seq: number;
                visitor_last_read_seq: number;
                visitor_last_delivered_seq: number;
                agent_last_read_seq: number;
                waiting_since: string | null;
                first_response_at: string | null;
                sla_due_at: string | null;
                resolved_at: string | null;
                visitor: {
                    name: string | null;
                    email: string | null;
                } | null;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        ConversationMessagePage: {
            data: {
                id: string;
                /** @enum {string} */
                direction: "inbound" | "outbound";
                status: string;
                body: string | null;
                content: {
                    [key: string]: unknown;
                };
                message_id: string | null;
                delivery_id: string | null;
                sent_by: string | null;
                error_code: string | null;
                read_at: string | null;
                created_at: string;
                seq: number;
                sender_type: string;
                client_message_id: string | null;
                attachments: {
                    id: string;
                    name: string;
                    type: string;
                    size: number;
                }[];
                quick_replies: {
                    id: string;
                    label: string;
                }[] | null;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        ConversationReplyResult: {
            message_id: string | null;
            conversation_message: {
                id: string;
                /** @enum {string} */
                direction: "inbound" | "outbound";
                status: string;
                body: string | null;
                content: {
                    [key: string]: unknown;
                };
                message_id: string | null;
                delivery_id: string | null;
                sent_by: string | null;
                error_code: string | null;
                read_at: string | null;
                created_at: string;
                seq: number;
                sender_type: string;
                client_message_id: string | null;
                attachments: {
                    id: string;
                    name: string;
                    type: string;
                    size: number;
                }[];
                quick_replies: {
                    id: string;
                    label: string;
                }[] | null;
            };
        };
        SmsKeyword: {
            id: string;
            keyword: string;
            /** @enum {string} */
            scope: "org" | "app";
            app_id: string | null;
            channels: ("sms" | "whatsapp" | "rcs")[];
            actions: {
                [key: string]: unknown;
            };
            enabled: boolean;
            description: string | null;
            created_at: string;
            updated_at: string;
        };
        SmsKeywordList: {
            data: {
                id: string;
                keyword: string;
                /** @enum {string} */
                scope: "org" | "app";
                app_id: string | null;
                channels: ("sms" | "whatsapp" | "rcs")[];
                actions: {
                    [key: string]: unknown;
                };
                enabled: boolean;
                description: string | null;
                created_at: string;
                updated_at: string;
            }[];
            reserved: string[];
        };
        WhatsAppTemplateList: {
            data: {
                id: string;
                external_id: string | null;
                name: string;
                language: string;
                category: string;
                status: string;
                components: {
                    [key: string]: unknown;
                }[];
                body_params: number;
                rejected_reason: string | null;
                quality_score: string | null;
                synced_at: string;
            }[];
        };
        WhatsAppTemplateSync: {
            total: number;
            removed: number;
            data: {
                id: string;
                external_id: string | null;
                name: string;
                language: string;
                category: string;
                status: string;
                components: {
                    [key: string]: unknown;
                }[];
                body_params: number;
                rejected_reason: string | null;
                quality_score: string | null;
                synced_at: string;
            }[];
        };
        ConversationContact: {
            user: {
                id: string;
                external_id: string | null;
                tags: {
                    [key: string]: unknown;
                };
                properties: {
                    [key: string]: unknown;
                };
                language: string | null;
                timezone: string | null;
                country: string | null;
                created_at: string;
                last_seen_at: string | null;
            } | null;
            subscriptions: {
                id: string;
                channel: string;
                status: string;
                token_masked: string | null;
                created_at: string;
            }[];
            recent_events: {
                name: string;
                occurred_at: string;
                properties: {
                    [key: string]: unknown;
                };
            }[];
            other_conversations: {
                id: string;
                /** @enum {string} */
                channel: "sms" | "whatsapp" | "rcs" | "email" | "chat";
                /** @enum {string} */
                status: "open" | "pending" | "resolved" | "closed";
                last_message_at: string;
            }[];
        };
        ConversationActivity: {
            data: {
                id: string;
                type: string;
                actor_type: string;
                actor_id: string | null;
                data: {
                    [key: string]: unknown;
                };
                created_at: string;
            }[];
        };
        ConversationTagsResult: {
            user_id: string;
            tags: {
                [key: string]: unknown;
            };
        };
        MessageCategory: {
            id: string;
            app_id: string;
            key: string;
            name: {
                [key: string]: string;
            };
            description: {
                [key: string]: string;
            };
            channels: string[] | null;
            default_opted_in: boolean;
            position: number;
            opted_out_users: number;
            created_at: string;
            updated_at: string;
        };
        MessageCategoryList: {
            data: {
                id: string;
                app_id: string;
                key: string;
                name: {
                    [key: string]: string;
                };
                description: {
                    [key: string]: string;
                };
                channels: string[] | null;
                default_opted_in: boolean;
                position: number;
                opted_out_users: number;
                created_at: string;
                updated_at: string;
            }[];
        };
        UserPreferences: {
            user_id: string;
            data: {
                category: string;
                channel: string | null;
                opted_in: boolean;
                explicit: boolean;
                source: string | null;
                updated_at: string | null;
            }[];
            categories: {
                id: string;
                app_id: string;
                key: string;
                name: {
                    [key: string]: string;
                };
                description: {
                    [key: string]: string;
                };
                channels: string[] | null;
                default_opted_in: boolean;
                position: number;
                opted_out_users: number;
                created_at: string;
                updated_at: string;
            }[];
            consents: {
                /** @enum {string} */
                purpose: "ads_personalization";
                granted: boolean;
                source: string | null;
                updated_at: string | null;
            }[];
        };
        SdkPreferences: {
            data: {
                category: string;
                channel: string | null;
                opted_in: boolean;
                explicit: boolean;
                source: string | null;
                updated_at: string | null;
            }[];
            categories: {
                key: string;
                name: {
                    [key: string]: string;
                };
                description: {
                    [key: string]: string;
                };
                channels: string[] | null;
                default_opted_in: boolean;
            }[];
            consents: {
                /** @enum {string} */
                purpose: "ads_personalization";
                granted: boolean;
                source: string | null;
                updated_at: string | null;
            }[];
        };
        InAppMessage: {
            id: string;
            app_id: string;
            name: string;
            /** @enum {string} */
            status: "draft" | "active" | "paused" | "archived";
            priority: number;
            triggers: ({
                /** @constant */
                kind: "session_start";
            } | {
                /** @constant */
                kind: "session_duration";
                seconds: number;
            } | {
                /** @constant */
                kind: "event";
                name: string;
            } | {
                /** @constant */
                kind: "screen";
                name: string;
            } | {
                /** @constant */
                kind: "trigger";
                key: string;
                /** @enum {string} */
                op: "eq" | "neq" | "exists" | "gt" | "lt";
                value?: string | number;
            })[];
            trigger_groups: ({
                /** @constant */
                kind: "session_start";
            } | {
                /** @constant */
                kind: "session_duration";
                seconds: number;
            } | {
                /** @constant */
                kind: "event";
                name: string;
            } | {
                /** @constant */
                kind: "screen";
                name: string;
            } | {
                /** @constant */
                kind: "trigger";
                key: string;
                /** @enum {string} */
                op: "eq" | "neq" | "exists" | "gt" | "lt";
                value?: string | number;
            })[][] | null;
            variants: {
                id: string;
                name: string;
                weight_percent: number;
                display: {
                    /** @enum {string} */
                    layout: "modal" | "banner_top" | "banner_bottom" | "fullscreen";
                    background_color?: string;
                    text_color?: string;
                    dismissible?: boolean;
                    auto_dismiss_seconds?: number;
                    /** @enum {string} */
                    content_type?: "blocks" | "html";
                    html?: {
                        [key: string]: string;
                    };
                    html_height?: number;
                    blocks: ({
                        /** @constant */
                        type: "image";
                        url: string;
                        alt?: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "title";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "body";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "button";
                        id: string;
                        text: {
                            [key: string]: string;
                        };
                        action: {
                            /** @constant */
                            type: "dismiss";
                        } | {
                            /** @constant */
                            type: "push_prompt";
                        } | {
                            /** @constant */
                            type: "outcome";
                            name: string;
                            value?: number;
                        } | {
                            /** @constant */
                            type: "url";
                            url: string;
                        } | {
                            /** @constant */
                            type: "deeplink";
                            url: string;
                        } | {
                            /** @constant */
                            type: "tags";
                            tags: {
                                [key: string]: string;
                            };
                        };
                        background_color?: string;
                        text_color?: string;
                    } | {
                        /** @constant */
                        type: "carousel";
                        id: string;
                        cards: {
                            id: string;
                            title: {
                                [key: string]: string;
                            };
                            body?: {
                                [key: string]: string;
                            };
                            image_url?: string;
                            image_alt?: {
                                [key: string]: string;
                            };
                            button?: {
                                id: string;
                                text: {
                                    [key: string]: string;
                                };
                                action: {
                                    /** @constant */
                                    type: "dismiss";
                                } | {
                                    /** @constant */
                                    type: "push_prompt";
                                } | {
                                    /** @constant */
                                    type: "outcome";
                                    name: string;
                                    value?: number;
                                } | {
                                    /** @constant */
                                    type: "url";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "deeplink";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "tags";
                                    tags: {
                                        [key: string]: string;
                                    };
                                };
                            };
                        }[];
                    })[];
                };
            }[];
            display: {
                /** @enum {string} */
                layout: "modal" | "banner_top" | "banner_bottom" | "fullscreen";
                background_color?: string;
                text_color?: string;
                dismissible?: boolean;
                auto_dismiss_seconds?: number;
                /** @enum {string} */
                content_type?: "blocks" | "html";
                html?: {
                    [key: string]: string;
                };
                html_height?: number;
                blocks: ({
                    /** @constant */
                    type: "image";
                    url: string;
                    alt?: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "title";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "body";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "button";
                    id: string;
                    text: {
                        [key: string]: string;
                    };
                    action: {
                        /** @constant */
                        type: "dismiss";
                    } | {
                        /** @constant */
                        type: "push_prompt";
                    } | {
                        /** @constant */
                        type: "outcome";
                        name: string;
                        value?: number;
                    } | {
                        /** @constant */
                        type: "url";
                        url: string;
                    } | {
                        /** @constant */
                        type: "deeplink";
                        url: string;
                    } | {
                        /** @constant */
                        type: "tags";
                        tags: {
                            [key: string]: string;
                        };
                    };
                    background_color?: string;
                    text_color?: string;
                } | {
                    /** @constant */
                    type: "carousel";
                    id: string;
                    cards: {
                        id: string;
                        title: {
                            [key: string]: string;
                        };
                        body?: {
                            [key: string]: string;
                        };
                        image_url?: string;
                        image_alt?: {
                            [key: string]: string;
                        };
                        button?: {
                            id: string;
                            text: {
                                [key: string]: string;
                            };
                            action: {
                                /** @constant */
                                type: "dismiss";
                            } | {
                                /** @constant */
                                type: "push_prompt";
                            } | {
                                /** @constant */
                                type: "outcome";
                                name: string;
                                value?: number;
                            } | {
                                /** @constant */
                                type: "url";
                                url: string;
                            } | {
                                /** @constant */
                                type: "deeplink";
                                url: string;
                            } | {
                                /** @constant */
                                type: "tags";
                                tags: {
                                    [key: string]: string;
                                };
                            };
                        };
                    }[];
                })[];
            };
            audience: {
                included_segments?: string[];
                excluded_segments?: string[];
            };
            frequency: {
                max_impressions?: number;
                min_interval_seconds?: number;
                stop_after_interaction?: boolean;
            };
            journey_only: boolean;
            start_at: string | null;
            end_at: string | null;
            stats: {
                impressions: number;
                clicks: number;
                dismissals: number;
                unique_users: number;
                ctr: number;
            };
            variant_stats: {
                variant_id: string;
                impressions: number;
                clicks: number;
                ctr: number;
            }[];
            ab_test: {
                winner?: {
                    /** @enum {string} */
                    mode: "manual" | "auto";
                    min_impressions?: number;
                    confidence?: number;
                };
                winner_variant_id: string | null;
                decided_at: string | null;
                decided_by: string | null;
            };
            variant_significance: {
                leader: string | null;
                p_value: number;
                significant: boolean;
            } | null;
            created_at: string;
            updated_at: string;
        };
        InAppMessagePage: {
            data: {
                id: string;
                app_id: string;
                name: string;
                /** @enum {string} */
                status: "draft" | "active" | "paused" | "archived";
                priority: number;
                triggers: ({
                    /** @constant */
                    kind: "session_start";
                } | {
                    /** @constant */
                    kind: "session_duration";
                    seconds: number;
                } | {
                    /** @constant */
                    kind: "event";
                    name: string;
                } | {
                    /** @constant */
                    kind: "screen";
                    name: string;
                } | {
                    /** @constant */
                    kind: "trigger";
                    key: string;
                    /** @enum {string} */
                    op: "eq" | "neq" | "exists" | "gt" | "lt";
                    value?: string | number;
                })[];
                trigger_groups: ({
                    /** @constant */
                    kind: "session_start";
                } | {
                    /** @constant */
                    kind: "session_duration";
                    seconds: number;
                } | {
                    /** @constant */
                    kind: "event";
                    name: string;
                } | {
                    /** @constant */
                    kind: "screen";
                    name: string;
                } | {
                    /** @constant */
                    kind: "trigger";
                    key: string;
                    /** @enum {string} */
                    op: "eq" | "neq" | "exists" | "gt" | "lt";
                    value?: string | number;
                })[][] | null;
                variants: {
                    id: string;
                    name: string;
                    weight_percent: number;
                    display: {
                        /** @enum {string} */
                        layout: "modal" | "banner_top" | "banner_bottom" | "fullscreen";
                        background_color?: string;
                        text_color?: string;
                        dismissible?: boolean;
                        auto_dismiss_seconds?: number;
                        /** @enum {string} */
                        content_type?: "blocks" | "html";
                        html?: {
                            [key: string]: string;
                        };
                        html_height?: number;
                        blocks: ({
                            /** @constant */
                            type: "image";
                            url: string;
                            alt?: {
                                [key: string]: string;
                            };
                        } | {
                            /** @constant */
                            type: "title";
                            text: {
                                [key: string]: string;
                            };
                        } | {
                            /** @constant */
                            type: "body";
                            text: {
                                [key: string]: string;
                            };
                        } | {
                            /** @constant */
                            type: "button";
                            id: string;
                            text: {
                                [key: string]: string;
                            };
                            action: {
                                /** @constant */
                                type: "dismiss";
                            } | {
                                /** @constant */
                                type: "push_prompt";
                            } | {
                                /** @constant */
                                type: "outcome";
                                name: string;
                                value?: number;
                            } | {
                                /** @constant */
                                type: "url";
                                url: string;
                            } | {
                                /** @constant */
                                type: "deeplink";
                                url: string;
                            } | {
                                /** @constant */
                                type: "tags";
                                tags: {
                                    [key: string]: string;
                                };
                            };
                            background_color?: string;
                            text_color?: string;
                        } | {
                            /** @constant */
                            type: "carousel";
                            id: string;
                            cards: {
                                id: string;
                                title: {
                                    [key: string]: string;
                                };
                                body?: {
                                    [key: string]: string;
                                };
                                image_url?: string;
                                image_alt?: {
                                    [key: string]: string;
                                };
                                button?: {
                                    id: string;
                                    text: {
                                        [key: string]: string;
                                    };
                                    action: {
                                        /** @constant */
                                        type: "dismiss";
                                    } | {
                                        /** @constant */
                                        type: "push_prompt";
                                    } | {
                                        /** @constant */
                                        type: "outcome";
                                        name: string;
                                        value?: number;
                                    } | {
                                        /** @constant */
                                        type: "url";
                                        url: string;
                                    } | {
                                        /** @constant */
                                        type: "deeplink";
                                        url: string;
                                    } | {
                                        /** @constant */
                                        type: "tags";
                                        tags: {
                                            [key: string]: string;
                                        };
                                    };
                                };
                            }[];
                        })[];
                    };
                }[];
                display: {
                    /** @enum {string} */
                    layout: "modal" | "banner_top" | "banner_bottom" | "fullscreen";
                    background_color?: string;
                    text_color?: string;
                    dismissible?: boolean;
                    auto_dismiss_seconds?: number;
                    /** @enum {string} */
                    content_type?: "blocks" | "html";
                    html?: {
                        [key: string]: string;
                    };
                    html_height?: number;
                    blocks: ({
                        /** @constant */
                        type: "image";
                        url: string;
                        alt?: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "title";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "body";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "button";
                        id: string;
                        text: {
                            [key: string]: string;
                        };
                        action: {
                            /** @constant */
                            type: "dismiss";
                        } | {
                            /** @constant */
                            type: "push_prompt";
                        } | {
                            /** @constant */
                            type: "outcome";
                            name: string;
                            value?: number;
                        } | {
                            /** @constant */
                            type: "url";
                            url: string;
                        } | {
                            /** @constant */
                            type: "deeplink";
                            url: string;
                        } | {
                            /** @constant */
                            type: "tags";
                            tags: {
                                [key: string]: string;
                            };
                        };
                        background_color?: string;
                        text_color?: string;
                    } | {
                        /** @constant */
                        type: "carousel";
                        id: string;
                        cards: {
                            id: string;
                            title: {
                                [key: string]: string;
                            };
                            body?: {
                                [key: string]: string;
                            };
                            image_url?: string;
                            image_alt?: {
                                [key: string]: string;
                            };
                            button?: {
                                id: string;
                                text: {
                                    [key: string]: string;
                                };
                                action: {
                                    /** @constant */
                                    type: "dismiss";
                                } | {
                                    /** @constant */
                                    type: "push_prompt";
                                } | {
                                    /** @constant */
                                    type: "outcome";
                                    name: string;
                                    value?: number;
                                } | {
                                    /** @constant */
                                    type: "url";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "deeplink";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "tags";
                                    tags: {
                                        [key: string]: string;
                                    };
                                };
                            };
                        }[];
                    })[];
                };
                audience: {
                    included_segments?: string[];
                    excluded_segments?: string[];
                };
                frequency: {
                    max_impressions?: number;
                    min_interval_seconds?: number;
                    stop_after_interaction?: boolean;
                };
                journey_only: boolean;
                start_at: string | null;
                end_at: string | null;
                stats: {
                    impressions: number;
                    clicks: number;
                    dismissals: number;
                    unique_users: number;
                    ctr: number;
                };
                variant_stats: {
                    variant_id: string;
                    impressions: number;
                    clicks: number;
                    ctr: number;
                }[];
                ab_test: {
                    winner?: {
                        /** @enum {string} */
                        mode: "manual" | "auto";
                        min_impressions?: number;
                        confidence?: number;
                    };
                    winner_variant_id: string | null;
                    decided_at: string | null;
                    decided_by: string | null;
                };
                variant_significance: {
                    leader: string | null;
                    p_value: number;
                    significant: boolean;
                } | null;
                created_at: string;
                updated_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        SdkInAppList: {
            data: {
                id: string;
                priority: number;
                triggers: ({
                    /** @constant */
                    kind: "session_start";
                } | {
                    /** @constant */
                    kind: "session_duration";
                    seconds: number;
                } | {
                    /** @constant */
                    kind: "event";
                    name: string;
                } | {
                    /** @constant */
                    kind: "screen";
                    name: string;
                } | {
                    /** @constant */
                    kind: "trigger";
                    key: string;
                    /** @enum {string} */
                    op: "eq" | "neq" | "exists" | "gt" | "lt";
                    value?: string | number;
                })[];
                trigger_groups: ({
                    /** @constant */
                    kind: "session_start";
                } | {
                    /** @constant */
                    kind: "session_duration";
                    seconds: number;
                } | {
                    /** @constant */
                    kind: "event";
                    name: string;
                } | {
                    /** @constant */
                    kind: "screen";
                    name: string;
                } | {
                    /** @constant */
                    kind: "trigger";
                    key: string;
                    /** @enum {string} */
                    op: "eq" | "neq" | "exists" | "gt" | "lt";
                    value?: string | number;
                })[][];
                variant_id: string | null;
                display: {
                    /** @enum {string} */
                    layout: "modal" | "banner_top" | "banner_bottom" | "fullscreen";
                    background_color: string | null;
                    text_color: string | null;
                    dismissible: boolean;
                    auto_dismiss_seconds: number | null;
                    /** @enum {string} */
                    content_type: "blocks" | "html";
                    html: string | null;
                    html_height: number | null;
                    blocks: ({
                        /** @constant */
                        type: "image";
                        url: string;
                        alt: string | null;
                    } | {
                        /** @constant */
                        type: "title";
                        text: string;
                    } | {
                        /** @constant */
                        type: "body";
                        text: string;
                    } | {
                        /** @constant */
                        type: "button";
                        id: string;
                        text: string;
                        action: {
                            /** @constant */
                            type: "dismiss";
                        } | {
                            /** @constant */
                            type: "push_prompt";
                        } | {
                            /** @constant */
                            type: "outcome";
                            name: string;
                            value?: number;
                        } | {
                            /** @constant */
                            type: "url";
                            url: string;
                        } | {
                            /** @constant */
                            type: "deeplink";
                            url: string;
                        } | {
                            /** @constant */
                            type: "tags";
                            tags: {
                                [key: string]: string;
                            };
                        };
                        background_color: string | null;
                        text_color: string | null;
                    } | {
                        /** @constant */
                        type: "carousel";
                        id: string;
                        cards: {
                            id: string;
                            title: string;
                            body: string | null;
                            image_url: string | null;
                            image_alt: string | null;
                            button: {
                                id: string;
                                text: string;
                                action: {
                                    /** @constant */
                                    type: "dismiss";
                                } | {
                                    /** @constant */
                                    type: "push_prompt";
                                } | {
                                    /** @constant */
                                    type: "outcome";
                                    name: string;
                                    value?: number;
                                } | {
                                    /** @constant */
                                    type: "url";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "deeplink";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "tags";
                                    tags: {
                                        [key: string]: string;
                                    };
                                };
                            } | null;
                        }[];
                    })[];
                };
                remaining_impressions: number;
                min_interval_seconds: number;
                stop_after_interaction: boolean;
                last_impression_at: string | null;
                end_at: string | null;
            }[];
            language: string;
        };
        InboxPage: {
            data: {
                id: string;
                message_id: string | null;
                title: string | null;
                body: string | null;
                url: string | null;
                image_url: string | null;
                data: {
                    [key: string]: string;
                };
                read: boolean;
                read_at: string | null;
                archived_at: string | null;
                expires_at: string | null;
                created_at: string;
            }[];
            unread_count: number;
            next_cursor: string | null;
            has_more: boolean;
        };
        InboxItem: {
            id: string;
            message_id: string | null;
            title: string | null;
            body: string | null;
            url: string | null;
            image_url: string | null;
            data: {
                [key: string]: string;
            };
            read: boolean;
            read_at: string | null;
            archived_at: string | null;
            expires_at: string | null;
            created_at: string;
        };
        InboxReadAllResult: {
            updated: number;
            unread_count: number;
        };
        Journey: {
            id: string;
            app_id: string;
            name: string;
            description: string | null;
            /** @enum {string} */
            status: "draft" | "active" | "paused" | "archived";
            current_version: number | null;
            draft_version: number | null;
            trigger_kind: string | null;
            published_at: string | null;
            created_by: string | null;
            created_at: string;
            updated_at: string;
            summary: {
                runs_total: number;
                active: number;
                completed: number;
                exited: number;
                failed: number;
                goal_reached: number;
            };
        };
        JourneyPage: {
            data: {
                id: string;
                app_id: string;
                name: string;
                description: string | null;
                /** @enum {string} */
                status: "draft" | "active" | "paused" | "archived";
                current_version: number | null;
                draft_version: number | null;
                trigger_kind: string | null;
                published_at: string | null;
                created_by: string | null;
                created_at: string;
                updated_at: string;
                summary: {
                    runs_total: number;
                    active: number;
                    completed: number;
                    exited: number;
                    failed: number;
                    goal_reached: number;
                };
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        JourneyDetail: {
            id: string;
            app_id: string;
            name: string;
            description: string | null;
            /** @enum {string} */
            status: "draft" | "active" | "paused" | "archived";
            current_version: number | null;
            draft_version: number | null;
            trigger_kind: string | null;
            published_at: string | null;
            created_by: string | null;
            created_at: string;
            updated_at: string;
            summary: {
                runs_total: number;
                active: number;
                completed: number;
                exited: number;
                failed: number;
                goal_reached: number;
            };
            editing: {
                version: number;
                graph: {
                    [key: string]: unknown;
                };
                settings: {
                    [key: string]: unknown;
                };
                published_at: string | null;
                published_by: string | null;
                created_at: string;
                updated_at: string;
            };
            issues: {
                code: string;
                node_id?: string;
                edge_id?: string;
                message: string;
            }[];
        };
        JourneyVersionList: {
            data: {
                version: number;
                graph: {
                    [key: string]: unknown;
                };
                settings: {
                    [key: string]: unknown;
                };
                published_at: string | null;
                published_by: string | null;
                created_at: string;
                updated_at: string;
            }[];
        };
        JourneyPublishResult: {
            journey: {
                id: string;
                app_id: string;
                name: string;
                description: string | null;
                /** @enum {string} */
                status: "draft" | "active" | "paused" | "archived";
                current_version: number | null;
                draft_version: number | null;
                trigger_kind: string | null;
                published_at: string | null;
                created_by: string | null;
                created_at: string;
                updated_at: string;
                summary: {
                    runs_total: number;
                    active: number;
                    completed: number;
                    exited: number;
                    failed: number;
                    goal_reached: number;
                };
            };
            version: number;
            issues: {
                code: string;
                node_id?: string;
                edge_id?: string;
                message: string;
            }[];
        };
        JourneyRun: {
            id: string;
            journey_id: string;
            version: number;
            user_id: string;
            external_id: string | null;
            /** @enum {string} */
            status: "active" | "waiting" | "completed" | "exited" | "failed";
            current_node_id: string | null;
            next_action_at: string | null;
            entered_at: string;
            completed_at: string | null;
            exit_reason: string | null;
            goal_id: string | null;
            goal_reached_at: string | null;
            context: {
                [key: string]: unknown;
            };
        };
        JourneyRunPage: {
            data: {
                id: string;
                journey_id: string;
                version: number;
                user_id: string;
                external_id: string | null;
                /** @enum {string} */
                status: "active" | "waiting" | "completed" | "exited" | "failed";
                current_node_id: string | null;
                next_action_at: string | null;
                entered_at: string;
                completed_at: string | null;
                exit_reason: string | null;
                goal_id: string | null;
                goal_reached_at: string | null;
                context: {
                    [key: string]: unknown;
                };
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        JourneyRunDetail: {
            id: string;
            journey_id: string;
            version: number;
            user_id: string;
            external_id: string | null;
            /** @enum {string} */
            status: "active" | "waiting" | "completed" | "exited" | "failed";
            current_node_id: string | null;
            next_action_at: string | null;
            entered_at: string;
            completed_at: string | null;
            exit_reason: string | null;
            goal_id: string | null;
            goal_reached_at: string | null;
            context: {
                [key: string]: unknown;
            };
            journey_name: string;
            steps: {
                id: string;
                node_id: string;
                node_type: string;
                /** @enum {string} */
                status: "completed" | "waiting" | "failed" | "skipped";
                branch: string | null;
                result: {
                    [key: string]: unknown;
                };
                started_at: string;
                finished_at: string | null;
            }[];
        };
        JourneyTriggerResult: {
            entered: boolean;
            run: {
                id: string;
                journey_id: string;
                version: number;
                user_id: string;
                external_id: string | null;
                /** @enum {string} */
                status: "active" | "waiting" | "completed" | "exited" | "failed";
                current_node_id: string | null;
                next_action_at: string | null;
                entered_at: string;
                completed_at: string | null;
                exit_reason: string | null;
                goal_id: string | null;
                goal_reached_at: string | null;
                context: {
                    [key: string]: unknown;
                };
            } | null;
            reason: ("inactive" | "outside_schedule" | "re_entry" | "already_active" | "unknown_user") | null;
        };
        JourneyStats: {
            version: number | null;
            summary: {
                runs_total: number;
                active: number;
                completed: number;
                exited: number;
                failed: number;
                goal_reached: number;
                waiting: number;
                goal_conversion_rate: number;
            };
            nodes: {
                node_id: string;
                node_type: string;
                entered: number;
                completed: number;
                waiting_now: number;
                skipped: number;
                failed: number;
                branches: {
                    [key: string]: number;
                };
                messages?: {
                    [key: string]: number;
                };
                variants?: {
                    variant_id: string;
                    sent: number;
                    opened: number;
                    clicked: number;
                    converted: number;
                    winner: boolean;
                }[];
            }[];
            goals: {
                goal_id: string;
                reached: number;
            }[];
            exit_reasons: {
                [key: string]: number;
            };
        };
        UserJourneyRuns: {
            data: {
                id: string;
                journey_id: string;
                version: number;
                user_id: string;
                external_id: string | null;
                /** @enum {string} */
                status: "active" | "waiting" | "completed" | "exited" | "failed";
                current_node_id: string | null;
                next_action_at: string | null;
                entered_at: string;
                completed_at: string | null;
                exit_reason: string | null;
                goal_id: string | null;
                goal_reached_at: string | null;
                context: {
                    [key: string]: unknown;
                };
                journey_name: string;
            }[];
        };
        Suppression: {
            id: string;
            app_id: string;
            /** @enum {string} */
            channel: "email" | "sms" | "whatsapp" | "rcs";
            value_masked: string;
            /** @enum {string} */
            reason: "bounce" | "complaint" | "manual" | "unsubscribe_link" | "stop";
            source: string;
            detail: {
                [key: string]: unknown;
            };
            expires_at: string | null;
            created_at: string;
            updated_at: string;
        };
        SuppressionPage: {
            data: {
                id: string;
                app_id: string;
                /** @enum {string} */
                channel: "email" | "sms" | "whatsapp" | "rcs";
                value_masked: string;
                /** @enum {string} */
                reason: "bounce" | "complaint" | "manual" | "unsubscribe_link" | "stop";
                source: string;
                detail: {
                    [key: string]: unknown;
                };
                expires_at: string | null;
                created_at: string;
                updated_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        CampaignVariantStats: {
            ab_test: {
                enabled?: boolean;
                test_percentage?: number;
                winner?: {
                    /** @enum {string} */
                    mode: "manual" | "auto";
                    /** @enum {string} */
                    metric: "open_rate" | "click_rate" | "conversion_rate";
                    evaluate_after_minutes?: number;
                };
                /** @enum {string} */
                phase?: "testing" | "winner_sent";
                winner_variant_id?: string;
                decided_at?: string;
                decided_by?: string;
                significance?: {
                    p_value: number;
                    significant: boolean;
                    metric: string;
                };
            };
            variants: {
                variant_id: string;
                name: string;
                weight_percent: number;
                is_control: boolean;
                targeted: number;
                sent: number;
                delivered: number;
                opened: number;
                clicked: number;
                converted: number;
                holdout: number;
                open_rate: number;
                click_rate: number;
                conversion_rate: number;
            }[];
            leader: string | null;
            significance: {
                p_value: number;
                significant: boolean;
                metric: string;
            };
        };
        Campaign: {
            id: string;
            app_id: string;
            name: string;
            labels: string[];
            category: string | null;
            ab_test: {
                enabled?: boolean;
                test_percentage?: number;
                winner?: {
                    /** @enum {string} */
                    mode: "manual" | "auto";
                    /** @enum {string} */
                    metric: "open_rate" | "click_rate" | "conversion_rate";
                    evaluate_after_minutes?: number;
                };
                /** @enum {string} */
                phase?: "testing" | "winner_sent";
                winner_variant_id?: string;
                decided_at?: string;
                decided_by?: string;
                significance?: {
                    p_value: number;
                    significant: boolean;
                    metric: string;
                };
            };
            variants: {
                id: string;
                name: string;
                weight_percent: number;
                content: {
                    [key: string]: unknown;
                } | null;
                is_control: boolean;
                position: number;
            }[];
            /** @enum {string} */
            type: "one_time" | "scheduled" | "recurring" | "automated" | "transactional";
            /** @enum {string} */
            status: "draft" | "scheduled" | "running" | "paused" | "completed" | "cancelled" | "failed";
            audience: {
                [key: string]: unknown;
            };
            content: {
                [key: string]: unknown;
            };
            template_id: string | null;
            template_version: number | null;
            delivery: {
                /** @enum {string} */
                timezone_mode?: "immediate" | "per_user_timezone" | "optimized";
                delivery_time_of_day?: string;
                throttle_per_minute?: number;
                ttl?: number;
                priority?: 5 | 10;
                collapse_id?: string;
                frequency_cap_exempt?: boolean;
                quiet_hours_exempt?: boolean;
                one_per_user?: boolean;
            };
            recurrence: {
                cron: string;
                until?: string | null;
                timezone?: string;
            } | null;
            approval: {
                required: boolean;
                /** @enum {string} */
                pending_action?: "send" | "schedule";
                requested_by?: string;
                requested_at?: string;
                approved_by?: string;
                approved_at?: string;
                rejected_by?: string;
                rejected_at?: string;
            };
            stats: {
                runs?: number;
                targeted?: number;
                suppressed?: number;
                sent?: number;
                delivered?: number;
                failed?: number;
                opened?: number;
                clicked?: number;
                converted?: number;
                bounced?: number;
                complained?: number;
                unsubscribed?: number;
                sms_segments?: number;
            };
            send_at: string | null;
            next_run_at: string | null;
            last_run_at: string | null;
            run_count: number;
            error: string | null;
            created_by: string | null;
            started_at: string | null;
            completed_at: string | null;
            created_at: string;
            updated_at: string;
            estimated_recipients: number | null;
        };
        CampaignPage: {
            data: {
                id: string;
                app_id: string;
                name: string;
                labels: string[];
                category: string | null;
                ab_test: {
                    enabled?: boolean;
                    test_percentage?: number;
                    winner?: {
                        /** @enum {string} */
                        mode: "manual" | "auto";
                        /** @enum {string} */
                        metric: "open_rate" | "click_rate" | "conversion_rate";
                        evaluate_after_minutes?: number;
                    };
                    /** @enum {string} */
                    phase?: "testing" | "winner_sent";
                    winner_variant_id?: string;
                    decided_at?: string;
                    decided_by?: string;
                    significance?: {
                        p_value: number;
                        significant: boolean;
                        metric: string;
                    };
                };
                variants: {
                    id: string;
                    name: string;
                    weight_percent: number;
                    content: {
                        [key: string]: unknown;
                    } | null;
                    is_control: boolean;
                    position: number;
                }[];
                /** @enum {string} */
                type: "one_time" | "scheduled" | "recurring" | "automated" | "transactional";
                /** @enum {string} */
                status: "draft" | "scheduled" | "running" | "paused" | "completed" | "cancelled" | "failed";
                audience: {
                    [key: string]: unknown;
                };
                content: {
                    [key: string]: unknown;
                };
                template_id: string | null;
                template_version: number | null;
                delivery: {
                    /** @enum {string} */
                    timezone_mode?: "immediate" | "per_user_timezone" | "optimized";
                    delivery_time_of_day?: string;
                    throttle_per_minute?: number;
                    ttl?: number;
                    priority?: 5 | 10;
                    collapse_id?: string;
                    frequency_cap_exempt?: boolean;
                    quiet_hours_exempt?: boolean;
                    one_per_user?: boolean;
                };
                recurrence: {
                    cron: string;
                    until?: string | null;
                    timezone?: string;
                } | null;
                approval: {
                    required: boolean;
                    /** @enum {string} */
                    pending_action?: "send" | "schedule";
                    requested_by?: string;
                    requested_at?: string;
                    approved_by?: string;
                    approved_at?: string;
                    rejected_by?: string;
                    rejected_at?: string;
                };
                stats: {
                    runs?: number;
                    targeted?: number;
                    suppressed?: number;
                    sent?: number;
                    delivered?: number;
                    failed?: number;
                    opened?: number;
                    clicked?: number;
                    converted?: number;
                    bounced?: number;
                    complained?: number;
                    unsubscribed?: number;
                    sms_segments?: number;
                };
                send_at: string | null;
                next_run_at: string | null;
                last_run_at: string | null;
                run_count: number;
                error: string | null;
                created_by: string | null;
                started_at: string | null;
                completed_at: string | null;
                created_at: string;
                updated_at: string;
                estimated_recipients: number | null;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        CampaignStats: {
            campaign: {
                id: string;
                app_id: string;
                name: string;
                labels: string[];
                category: string | null;
                ab_test: {
                    enabled?: boolean;
                    test_percentage?: number;
                    winner?: {
                        /** @enum {string} */
                        mode: "manual" | "auto";
                        /** @enum {string} */
                        metric: "open_rate" | "click_rate" | "conversion_rate";
                        evaluate_after_minutes?: number;
                    };
                    /** @enum {string} */
                    phase?: "testing" | "winner_sent";
                    winner_variant_id?: string;
                    decided_at?: string;
                    decided_by?: string;
                    significance?: {
                        p_value: number;
                        significant: boolean;
                        metric: string;
                    };
                };
                variants: {
                    id: string;
                    name: string;
                    weight_percent: number;
                    content: {
                        [key: string]: unknown;
                    } | null;
                    is_control: boolean;
                    position: number;
                }[];
                /** @enum {string} */
                type: "one_time" | "scheduled" | "recurring" | "automated" | "transactional";
                /** @enum {string} */
                status: "draft" | "scheduled" | "running" | "paused" | "completed" | "cancelled" | "failed";
                audience: {
                    [key: string]: unknown;
                };
                content: {
                    [key: string]: unknown;
                };
                template_id: string | null;
                template_version: number | null;
                delivery: {
                    /** @enum {string} */
                    timezone_mode?: "immediate" | "per_user_timezone" | "optimized";
                    delivery_time_of_day?: string;
                    throttle_per_minute?: number;
                    ttl?: number;
                    priority?: 5 | 10;
                    collapse_id?: string;
                    frequency_cap_exempt?: boolean;
                    quiet_hours_exempt?: boolean;
                    one_per_user?: boolean;
                };
                recurrence: {
                    cron: string;
                    until?: string | null;
                    timezone?: string;
                } | null;
                approval: {
                    required: boolean;
                    /** @enum {string} */
                    pending_action?: "send" | "schedule";
                    requested_by?: string;
                    requested_at?: string;
                    approved_by?: string;
                    approved_at?: string;
                    rejected_by?: string;
                    rejected_at?: string;
                };
                stats: {
                    runs?: number;
                    targeted?: number;
                    suppressed?: number;
                    sent?: number;
                    delivered?: number;
                    failed?: number;
                    opened?: number;
                    clicked?: number;
                    converted?: number;
                    bounced?: number;
                    complained?: number;
                    unsubscribed?: number;
                    sms_segments?: number;
                };
                send_at: string | null;
                next_run_at: string | null;
                last_run_at: string | null;
                run_count: number;
                error: string | null;
                created_by: string | null;
                started_at: string | null;
                completed_at: string | null;
                created_at: string;
                updated_at: string;
                estimated_recipients: number | null;
            };
            rates: {
                delivery_rate: number | null;
                open_rate: number | null;
                click_rate: number | null;
                failure_rate: number | null;
                conversion_rate: number | null;
            };
            channels: {
                /** @enum {string} */
                channel: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                targeted: number;
                sent: number;
                failed: number;
                opened: number;
                clicked: number;
            }[];
            hourly: {
                hour: string;
                sent: number;
                failed: number;
                opened: number;
                clicked: number;
            }[];
            errors: {
                code: string;
                count: number;
            }[];
            messages: {
                id: string;
                app_id: string;
                /** @enum {string} */
                source: "campaign" | "api" | "journey" | "test";
                /** @enum {string} */
                status: "queued" | "processing" | "completed" | "cancelled" | "failed";
                idempotency_key: string | null;
                name: string | null;
                content: {
                    [key: string]: unknown;
                };
                target: {
                    [key: string]: unknown;
                };
                options: {
                    [key: string]: unknown;
                };
                labels: string[];
                category: string | null;
                template_id: string | null;
                campaign_id: string | null;
                variants: {
                    id: string;
                    name: string;
                    weight_percent: number;
                    is_control: boolean;
                }[] | null;
                counts: {
                    targeted?: number;
                    suppressed?: number;
                    sent?: number;
                    delivered?: number;
                    failed?: number;
                    errored?: number;
                    expired?: number;
                    opened?: number;
                    clicked?: number;
                    converted?: number;
                    bounced?: number;
                    complained?: number;
                    unsubscribed?: number;
                    sms_segments?: number;
                };
                requested_by: {
                    /** @enum {string} */
                    type: "api_key" | "account" | "system";
                    id?: string;
                };
                error: string | null;
                scheduled_for: string | null;
                started_at: string | null;
                completed_at: string | null;
                created_at: string;
                updated_at: string;
            }[];
        };
        AiSettings: {
            enabled: boolean;
            monthly_token_quota: number;
            banned_phrases: string[];
            /** @enum {string} */
            provider: "anthropic" | "openrouter" | "mock";
            available: boolean;
            models: {
                default: string;
                long: string;
            };
            usage: {
                used_tokens: number;
                quota_tokens: number;
                period_start: string;
            };
        };
        AiUsageReport: {
            period_start: string;
            used_tokens: number;
            quota_tokens: number;
            by_feature: {
                feature: string;
                model: string;
                requests: number;
                input_tokens: number;
                output_tokens: number;
            }[];
        };
        AiStatus: {
            enabled: boolean;
            available: boolean;
            /** @enum {string} */
            provider: "anthropic" | "openrouter" | "mock";
            usage: {
                used_tokens: number;
                quota_tokens: number;
                period_start: string;
            };
            languages: string[];
            default_language: string;
            field_limits: {
                [key: string]: number;
            };
            pending_translations: number;
        };
        AiSuggestions: {
            suggestions: {
                text: string;
                length: number;
            }[];
            meta: {
                model: string;
                filtered: number;
                warnings: string[];
            };
        };
        AiVariantsResult: {
            variants: {
                name: string;
                title: string;
                body: string;
                rationale: string;
            }[];
            meta: {
                model: string;
                filtered: number;
                warnings: string[];
            };
        };
        AiSubjectScoreResult: {
            score: number;
            reasons: string[];
            improved: string[];
            meta: {
                model: string;
                filtered: number;
                warnings: string[];
            };
        };
        AiTranslation: {
            id: string;
            source_language: string;
            target_language: string;
            source: {
                headings?: string;
                contents?: string;
                subtitle?: string;
                email_subject?: string;
                email_preheader?: string;
            };
            result: {
                headings?: string;
                contents?: string;
                subtitle?: string;
                email_subject?: string;
                email_preheader?: string;
            };
            /** @enum {string} */
            status: "pending" | "approved" | "rejected";
            ref_type: string | null;
            ref_id: string | null;
            warnings: string[];
            created_at: string;
            reviewed_at: string | null;
            reviewed_by: string | null;
        };
        AiTranslationList: {
            data: {
                id: string;
                source_language: string;
                target_language: string;
                source: {
                    headings?: string;
                    contents?: string;
                    subtitle?: string;
                    email_subject?: string;
                    email_preheader?: string;
                };
                result: {
                    headings?: string;
                    contents?: string;
                    subtitle?: string;
                    email_subject?: string;
                    email_preheader?: string;
                };
                /** @enum {string} */
                status: "pending" | "approved" | "rejected";
                ref_type: string | null;
                ref_id: string | null;
                warnings: string[];
                created_at: string;
                reviewed_at: string | null;
                reviewed_by: string | null;
            }[];
        };
        AiTranslateResult: {
            data: {
                id: string;
                source_language: string;
                target_language: string;
                source: {
                    headings?: string;
                    contents?: string;
                    subtitle?: string;
                    email_subject?: string;
                    email_preheader?: string;
                };
                result: {
                    headings?: string;
                    contents?: string;
                    subtitle?: string;
                    email_subject?: string;
                    email_preheader?: string;
                };
                /** @enum {string} */
                status: "pending" | "approved" | "rejected";
                ref_type: string | null;
                ref_id: string | null;
                warnings: string[];
                created_at: string;
                reviewed_at: string | null;
                reviewed_by: string | null;
            }[];
            meta: {
                model: string;
                filtered: number;
                warnings: string[];
            };
        };
        AiGlossaryEntry: {
            id: string;
            term: string;
            translations: {
                [key: string]: string;
            };
            note: string | null;
            created_at: string;
            updated_at: string;
        };
        AiGlossaryList: {
            data: {
                id: string;
                term: string;
                translations: {
                    [key: string]: string;
                };
                note: string | null;
                created_at: string;
                updated_at: string;
            }[];
        };
        InboxSettings: {
            widget: {
                enabled?: boolean;
                color?: string;
                text_color?: string;
                /** @enum {string} */
                position?: "right" | "left";
                /** @enum {string} */
                theme?: "light" | "dark" | "auto";
                title?: {
                    [key: string]: string;
                };
                greeting?: {
                    [key: string]: string;
                };
                offline_message?: {
                    [key: string]: string;
                };
                collect_email_offline?: boolean;
                attachments?: boolean;
                require_email?: boolean;
            };
            business_hours: {
                enabled?: boolean;
                timezone?: string | null;
                days?: {
                    day: number;
                    start: string;
                    end: string;
                }[];
                holidays?: string[];
            };
            routing: {
                auto_assign: boolean;
                /** @enum {string} */
                visibility: "all" | "team" | "assigned";
                show_unassigned: boolean;
                first_response_sla_seconds: number;
                max_concurrent_default: number | null;
            };
            email: {
                capture_replies: boolean;
                reply_domain: string | null;
            };
            timezone: string;
            within_business_hours: boolean;
            install: {
                app_id: string;
                sdk_url: string;
                api_url: string;
            };
        };
        InboxTeam: {
            id: string;
            name: string;
            description: string | null;
            member_ids: string[];
            created_at: string;
            updated_at: string;
        };
        InboxTeamList: {
            data: {
                id: string;
                name: string;
                description: string | null;
                member_ids: string[];
                created_at: string;
                updated_at: string;
            }[];
        };
        AssignmentRule: {
            id: string;
            name: string;
            enabled: boolean;
            position: number;
            conditions: {
                channels?: ("sms" | "whatsapp" | "rcs" | "email" | "chat")[];
                languages?: string[];
                tags?: {
                    [key: string]: string;
                };
            };
            /** @enum {string} */
            strategy: "round_robin" | "least_busy" | "team_only";
            team_id: string | null;
            agent_ids: string[];
            created_at: string;
            updated_at: string;
        };
        AssignmentRuleList: {
            data: {
                id: string;
                name: string;
                enabled: boolean;
                position: number;
                conditions: {
                    channels?: ("sms" | "whatsapp" | "rcs" | "email" | "chat")[];
                    languages?: string[];
                    tags?: {
                        [key: string]: string;
                    };
                };
                /** @enum {string} */
                strategy: "round_robin" | "least_busy" | "team_only";
                team_id: string | null;
                agent_ids: string[];
                created_at: string;
                updated_at: string;
            }[];
        };
        CannedResponse: {
            id: string;
            shortcut: string;
            title: string;
            body: string;
            language: string | null;
            created_at: string;
            updated_at: string;
        };
        CannedResponseList: {
            data: {
                id: string;
                shortcut: string;
                title: string;
                body: string;
                language: string | null;
                created_at: string;
                updated_at: string;
            }[];
        };
        CannedResponseRender: {
            text: string;
        };
        InboxAgent: {
            account_id: string;
            name: string;
            email: string;
            role: string;
            /** @enum {string} */
            status: "online" | "busy" | "offline";
            last_heartbeat_at: string | null;
            max_concurrent: number | null;
            languages: string[];
            open_conversations: number;
            team_ids: string[];
        };
        InboxAgentList: {
            data: {
                account_id: string;
                name: string;
                email: string;
                role: string;
                /** @enum {string} */
                status: "online" | "busy" | "offline";
                last_heartbeat_at: string | null;
                max_concurrent: number | null;
                languages: string[];
                open_conversations: number;
                team_ids: string[];
            }[];
        };
        InboxMetrics: {
            from: string;
            to: string;
            first_response: {
                count: number;
                avg_seconds: number | null;
                p90_seconds: number | null;
            };
            resolution: {
                count: number;
                avg_seconds: number | null;
                p90_seconds: number | null;
            };
            sla: {
                target_seconds: number;
                met: number;
                breached: number;
                rate: number | null;
            };
            volume: {
                created: number;
                resolved: number;
                open_now: number;
                unassigned_now: number;
                by_channel: {
                    [key: string]: number;
                };
            };
            agents: {
                account_id: string;
                name: string | null;
                first_response: {
                    count: number;
                    avg_seconds: number | null;
                    p90_seconds: number | null;
                };
                resolution: {
                    count: number;
                    avg_seconds: number | null;
                    p90_seconds: number | null;
                };
                resolved: number;
                open_now: number;
            }[];
            daily: {
                date: string;
                created: number;
                resolved: number;
                first_response_avg_seconds: number | null;
            }[];
        };
        AiConversationSummary: {
            summary: string;
            key_points: string[];
            /** @enum {string} */
            sentiment: "positive" | "neutral" | "negative";
            meta: {
                model: string;
                messages: number;
            };
        };
        AiReplySuggestions: {
            suggestions: {
                text: string;
            }[];
            meta: {
                model: string;
                filtered: number;
                messages: number;
            };
        };
        SdkChatConfig: {
            enabled: boolean;
            online: boolean;
            within_business_hours: boolean;
            color: string | null;
            text_color: string | null;
            /** @enum {string} */
            position: "right" | "left";
            /** @enum {string} */
            theme: "light" | "dark" | "auto";
            title: string | null;
            greeting: string | null;
            offline_message: string | null;
            collect_email_offline: boolean;
            require_email: boolean;
            attachments: {
                enabled: boolean;
                max_bytes: number;
                types: string[];
            };
            language: string;
        };
        SdkChatConversation: {
            conversation: {
                id: string;
                /** @enum {string} */
                status: "open" | "pending" | "resolved" | "closed";
                last_seq: number;
                agent_last_read_seq: number;
                visitor_last_read_seq: number;
                unread_count: number;
                bot_active: boolean;
                assignee_name: string | null;
                created_at: string;
            } | null;
            unread_count: number;
        };
        SdkChatMessagePage: {
            data: {
                id: string;
                seq: number;
                client_message_id: string | null;
                /** @enum {string} */
                sender: "visitor" | "agent" | "bot" | "system";
                author_name: string | null;
                text: string | null;
                attachments: {
                    id: string;
                    name: string;
                    type: string;
                    size: number;
                }[];
                quick_replies: {
                    id: string;
                    label: string;
                }[] | null;
                /** @enum {string} */
                status: "sent" | "delivered" | "read";
                created_at: string;
            }[];
            has_more: boolean;
        };
        SdkChatSendResult: {
            message: {
                id: string;
                seq: number;
                client_message_id: string | null;
                /** @enum {string} */
                sender: "visitor" | "agent" | "bot" | "system";
                author_name: string | null;
                text: string | null;
                attachments: {
                    id: string;
                    name: string;
                    type: string;
                    size: number;
                }[];
                quick_replies: {
                    id: string;
                    label: string;
                }[] | null;
                /** @enum {string} */
                status: "sent" | "delivered" | "read";
                created_at: string;
            };
            conversation: {
                id: string;
                /** @enum {string} */
                status: "open" | "pending" | "resolved" | "closed";
                last_seq: number;
                agent_last_read_seq: number;
                visitor_last_read_seq: number;
                unread_count: number;
                bot_active: boolean;
                assignee_name: string | null;
                created_at: string;
            };
            duplicate: boolean;
        };
        SdkChatIdentifyResult: {
            user_id: string | null;
            conversation: {
                id: string;
                /** @enum {string} */
                status: "open" | "pending" | "resolved" | "closed";
                last_seq: number;
                agent_last_read_seq: number;
                visitor_last_read_seq: number;
                unread_count: number;
                bot_active: boolean;
                assignee_name: string | null;
                created_at: string;
            } | null;
        };
        EmailWarmupPlan: {
            id: string;
            name: string;
            /** @enum {string} */
            kind: "domain" | "ip";
            target: string;
            start_date: string;
            daily_limits: number[];
            provider_shares: {
                [key: string]: number;
            };
            timezone: string;
            /** @enum {string} */
            status: "active" | "paused" | "completed";
            today: {
                day: string;
                index: number;
                limit: number | null;
                used: number;
                buckets: {
                    [key: string]: {
                        limit: number | null;
                        used: number;
                    };
                };
            };
            scheduled_ahead: number;
            created_at: string;
            updated_at: string;
        };
        EmailWarmupPlanList: {
            data: {
                id: string;
                name: string;
                /** @enum {string} */
                kind: "domain" | "ip";
                target: string;
                start_date: string;
                daily_limits: number[];
                provider_shares: {
                    [key: string]: number;
                };
                timezone: string;
                /** @enum {string} */
                status: "active" | "paused" | "completed";
                today: {
                    day: string;
                    index: number;
                    limit: number | null;
                    used: number;
                    buckets: {
                        [key: string]: {
                            limit: number | null;
                            used: number;
                        };
                    };
                };
                scheduled_ahead: number;
                created_at: string;
                updated_at: string;
            }[];
        };
        EmailWarmupUsage: {
            data: {
                day: string;
                bucket: string;
                used: number;
                limit: number | null;
            }[];
        };
        EmailDeliverabilitySettings: {
            bcc_address: string | null;
            validation: {
                enabled: boolean;
                check_mx: boolean;
                block_disposable: boolean;
                block_role: boolean;
            };
            verifier: {
                provider: ("zerobounce" | "neverbounce" | "mock") | null;
                has_key: boolean;
            };
        };
        EmailAddressCheck: {
            ok: boolean;
            reason: ("syntax" | "no_mx" | "disposable" | "role" | "verifier_invalid") | null;
            detail: string | null;
            checks: string[];
            unknown: string[];
        };
        LiveActivityType: {
            id: string;
            name: string;
            description: string | null;
            content_state_schema: {
                /** @constant */
                type: "object";
                properties: {
                    [key: string]: {
                        /** @enum {string} */
                        type: "string" | "number" | "integer" | "boolean";
                        enum?: (string | number)[];
                        maxLength?: number;
                        minimum?: number;
                        maximum?: number;
                        description?: string;
                    };
                };
                required?: string[];
            };
            attributes_schema: {
                /** @constant */
                type: "object";
                properties: {
                    [key: string]: {
                        /** @enum {string} */
                        type: "string" | "number" | "integer" | "boolean";
                        enum?: (string | number)[];
                        maxLength?: number;
                        minimum?: number;
                        maximum?: number;
                        description?: string;
                    };
                };
                required?: string[];
            };
            push_to_start_tokens: number;
            created_at: string;
            updated_at: string;
        };
        LiveActivityTypeList: {
            data: {
                id: string;
                name: string;
                description: string | null;
                content_state_schema: {
                    /** @constant */
                    type: "object";
                    properties: {
                        [key: string]: {
                            /** @enum {string} */
                            type: "string" | "number" | "integer" | "boolean";
                            enum?: (string | number)[];
                            maxLength?: number;
                            minimum?: number;
                            maximum?: number;
                            description?: string;
                        };
                    };
                    required?: string[];
                };
                attributes_schema: {
                    /** @constant */
                    type: "object";
                    properties: {
                        [key: string]: {
                            /** @enum {string} */
                            type: "string" | "number" | "integer" | "boolean";
                            enum?: (string | number)[];
                            maxLength?: number;
                            minimum?: number;
                            maximum?: number;
                            description?: string;
                        };
                    };
                    required?: string[];
                };
                push_to_start_tokens: number;
                created_at: string;
                updated_at: string;
            }[];
        };
        LiveActivitySendResult: {
            message_id: string;
            activity_id: string;
            /** @enum {string} */
            event: "start" | "update" | "end";
            recipients_estimate: number;
        };
        LiveActivityTokenResult: {
            /** @constant */
            ok: true;
        };
        EmailDesign: {
            id: string;
            app_id: string;
            name: string;
            subject: string;
            preheader: string | null;
            version: number;
            template_id: string | null;
            template_version: number | null;
            created_by: string | null;
            updated_by: string | null;
            created_at: string;
            updated_at: string;
            document: {
                /** @constant */
                version: 1;
                settings: {
                    width?: number;
                    background_color?: string;
                    content_background_color?: string;
                    text_color?: string;
                    link_color?: string;
                    /** @enum {string} */
                    font_family?: "system" | "arial" | "georgia" | "verdana" | "trebuchet" | "courier";
                    dark_mode?: {
                        background_color?: string;
                        content_background_color?: string;
                        text_color?: string;
                        link_color?: string;
                    };
                };
                sections: {
                    id: string;
                    /** @constant */
                    type: "section";
                    background_color?: string;
                    background_image?: string;
                    padding?: {
                        top: number;
                        right: number;
                        bottom: number;
                        left: number;
                    };
                    stack_on_mobile?: boolean;
                    columns: {
                        id: string;
                        width_percent?: number;
                        background_color?: string;
                        /** @enum {string} */
                        vertical_align?: "top" | "middle" | "bottom";
                        padding?: {
                            top: number;
                            right: number;
                            bottom: number;
                            left: number;
                        };
                        blocks: ({
                            id: string;
                            /** @constant */
                            type: "text";
                            html: string;
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            font_size?: number;
                            line_height?: number;
                            color?: string;
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "image";
                            src: string;
                            alt: string;
                            decorative?: boolean;
                            href?: string;
                            width?: number;
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "button";
                            text: string;
                            href: string;
                            background_color?: string;
                            text_color?: string;
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            border_radius?: number;
                            font_size?: number;
                            full_width?: boolean;
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "divider";
                            color?: string;
                            thickness?: number;
                            width_percent?: number;
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "spacer";
                            height: number;
                        } | {
                            id: string;
                            /** @constant */
                            type: "social";
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            icon_size?: number;
                            items: {
                                /** @enum {string} */
                                network: "facebook" | "x" | "instagram" | "linkedin" | "youtube" | "pinterest" | "github" | "web";
                                href: string;
                                label?: string;
                            }[];
                        } | {
                            id: string;
                            /** @constant */
                            type: "html";
                            html: string;
                        })[];
                    }[];
                }[];
            };
            issues: {
                /** @enum {string} */
                code: "image_alt_missing" | "low_contrast" | "empty_link" | "button_text_missing" | "link_text_missing";
                /** @enum {string} */
                severity: "error" | "warning";
                block_id: string;
                /** @enum {string} */
                mode?: "light" | "dark";
                ratio?: number;
                required?: number;
                foreground?: string;
                background?: string;
            }[];
            warnings: string[];
        };
        EmailDesignPage: {
            data: {
                id: string;
                app_id: string;
                name: string;
                subject: string;
                preheader: string | null;
                version: number;
                template_id: string | null;
                template_version: number | null;
                created_by: string | null;
                updated_by: string | null;
                created_at: string;
                updated_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        EmailDesignPreview: {
            html: string;
            mjml: string;
            warnings: string[];
            issues: {
                /** @enum {string} */
                code: "image_alt_missing" | "low_contrast" | "empty_link" | "button_text_missing" | "link_text_missing";
                /** @enum {string} */
                severity: "error" | "warning";
                block_id: string;
                /** @enum {string} */
                mode?: "light" | "dark";
                ratio?: number;
                required?: number;
                foreground?: string;
                background?: string;
            }[];
        };
        EmailSavedBlock: {
            id: string;
            app_id: string;
            name: string;
            /** @enum {string} */
            kind: "section" | "block";
            content: {
                /** @constant */
                kind: "section";
                section: {
                    id: string;
                    /** @constant */
                    type: "section";
                    background_color?: string;
                    background_image?: string;
                    padding?: {
                        top: number;
                        right: number;
                        bottom: number;
                        left: number;
                    };
                    stack_on_mobile?: boolean;
                    columns: {
                        id: string;
                        width_percent?: number;
                        background_color?: string;
                        /** @enum {string} */
                        vertical_align?: "top" | "middle" | "bottom";
                        padding?: {
                            top: number;
                            right: number;
                            bottom: number;
                            left: number;
                        };
                        blocks: ({
                            id: string;
                            /** @constant */
                            type: "text";
                            html: string;
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            font_size?: number;
                            line_height?: number;
                            color?: string;
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "image";
                            src: string;
                            alt: string;
                            decorative?: boolean;
                            href?: string;
                            width?: number;
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "button";
                            text: string;
                            href: string;
                            background_color?: string;
                            text_color?: string;
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            border_radius?: number;
                            font_size?: number;
                            full_width?: boolean;
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "divider";
                            color?: string;
                            thickness?: number;
                            width_percent?: number;
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "spacer";
                            height: number;
                        } | {
                            id: string;
                            /** @constant */
                            type: "social";
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            icon_size?: number;
                            items: {
                                /** @enum {string} */
                                network: "facebook" | "x" | "instagram" | "linkedin" | "youtube" | "pinterest" | "github" | "web";
                                href: string;
                                label?: string;
                            }[];
                        } | {
                            id: string;
                            /** @constant */
                            type: "html";
                            html: string;
                        })[];
                    }[];
                };
            } | {
                /** @constant */
                kind: "block";
                block: {
                    id: string;
                    /** @constant */
                    type: "text";
                    html: string;
                    /** @enum {string} */
                    align?: "left" | "center" | "right";
                    font_size?: number;
                    line_height?: number;
                    color?: string;
                    padding?: {
                        top: number;
                        right: number;
                        bottom: number;
                        left: number;
                    };
                } | {
                    id: string;
                    /** @constant */
                    type: "image";
                    src: string;
                    alt: string;
                    decorative?: boolean;
                    href?: string;
                    width?: number;
                    /** @enum {string} */
                    align?: "left" | "center" | "right";
                    padding?: {
                        top: number;
                        right: number;
                        bottom: number;
                        left: number;
                    };
                } | {
                    id: string;
                    /** @constant */
                    type: "button";
                    text: string;
                    href: string;
                    background_color?: string;
                    text_color?: string;
                    /** @enum {string} */
                    align?: "left" | "center" | "right";
                    border_radius?: number;
                    font_size?: number;
                    full_width?: boolean;
                    padding?: {
                        top: number;
                        right: number;
                        bottom: number;
                        left: number;
                    };
                } | {
                    id: string;
                    /** @constant */
                    type: "divider";
                    color?: string;
                    thickness?: number;
                    width_percent?: number;
                    padding?: {
                        top: number;
                        right: number;
                        bottom: number;
                        left: number;
                    };
                } | {
                    id: string;
                    /** @constant */
                    type: "spacer";
                    height: number;
                } | {
                    id: string;
                    /** @constant */
                    type: "social";
                    /** @enum {string} */
                    align?: "left" | "center" | "right";
                    icon_size?: number;
                    items: {
                        /** @enum {string} */
                        network: "facebook" | "x" | "instagram" | "linkedin" | "youtube" | "pinterest" | "github" | "web";
                        href: string;
                        label?: string;
                    }[];
                } | {
                    id: string;
                    /** @constant */
                    type: "html";
                    html: string;
                };
            };
            created_by: string | null;
            created_at: string;
        };
        EmailSavedBlockList: {
            data: {
                id: string;
                app_id: string;
                name: string;
                /** @enum {string} */
                kind: "section" | "block";
                content: {
                    /** @constant */
                    kind: "section";
                    section: {
                        id: string;
                        /** @constant */
                        type: "section";
                        background_color?: string;
                        background_image?: string;
                        padding?: {
                            top: number;
                            right: number;
                            bottom: number;
                            left: number;
                        };
                        stack_on_mobile?: boolean;
                        columns: {
                            id: string;
                            width_percent?: number;
                            background_color?: string;
                            /** @enum {string} */
                            vertical_align?: "top" | "middle" | "bottom";
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                            blocks: ({
                                id: string;
                                /** @constant */
                                type: "text";
                                html: string;
                                /** @enum {string} */
                                align?: "left" | "center" | "right";
                                font_size?: number;
                                line_height?: number;
                                color?: string;
                                padding?: {
                                    top: number;
                                    right: number;
                                    bottom: number;
                                    left: number;
                                };
                            } | {
                                id: string;
                                /** @constant */
                                type: "image";
                                src: string;
                                alt: string;
                                decorative?: boolean;
                                href?: string;
                                width?: number;
                                /** @enum {string} */
                                align?: "left" | "center" | "right";
                                padding?: {
                                    top: number;
                                    right: number;
                                    bottom: number;
                                    left: number;
                                };
                            } | {
                                id: string;
                                /** @constant */
                                type: "button";
                                text: string;
                                href: string;
                                background_color?: string;
                                text_color?: string;
                                /** @enum {string} */
                                align?: "left" | "center" | "right";
                                border_radius?: number;
                                font_size?: number;
                                full_width?: boolean;
                                padding?: {
                                    top: number;
                                    right: number;
                                    bottom: number;
                                    left: number;
                                };
                            } | {
                                id: string;
                                /** @constant */
                                type: "divider";
                                color?: string;
                                thickness?: number;
                                width_percent?: number;
                                padding?: {
                                    top: number;
                                    right: number;
                                    bottom: number;
                                    left: number;
                                };
                            } | {
                                id: string;
                                /** @constant */
                                type: "spacer";
                                height: number;
                            } | {
                                id: string;
                                /** @constant */
                                type: "social";
                                /** @enum {string} */
                                align?: "left" | "center" | "right";
                                icon_size?: number;
                                items: {
                                    /** @enum {string} */
                                    network: "facebook" | "x" | "instagram" | "linkedin" | "youtube" | "pinterest" | "github" | "web";
                                    href: string;
                                    label?: string;
                                }[];
                            } | {
                                id: string;
                                /** @constant */
                                type: "html";
                                html: string;
                            })[];
                        }[];
                    };
                } | {
                    /** @constant */
                    kind: "block";
                    block: {
                        id: string;
                        /** @constant */
                        type: "text";
                        html: string;
                        /** @enum {string} */
                        align?: "left" | "center" | "right";
                        font_size?: number;
                        line_height?: number;
                        color?: string;
                        padding?: {
                            top: number;
                            right: number;
                            bottom: number;
                            left: number;
                        };
                    } | {
                        id: string;
                        /** @constant */
                        type: "image";
                        src: string;
                        alt: string;
                        decorative?: boolean;
                        href?: string;
                        width?: number;
                        /** @enum {string} */
                        align?: "left" | "center" | "right";
                        padding?: {
                            top: number;
                            right: number;
                            bottom: number;
                            left: number;
                        };
                    } | {
                        id: string;
                        /** @constant */
                        type: "button";
                        text: string;
                        href: string;
                        background_color?: string;
                        text_color?: string;
                        /** @enum {string} */
                        align?: "left" | "center" | "right";
                        border_radius?: number;
                        font_size?: number;
                        full_width?: boolean;
                        padding?: {
                            top: number;
                            right: number;
                            bottom: number;
                            left: number;
                        };
                    } | {
                        id: string;
                        /** @constant */
                        type: "divider";
                        color?: string;
                        thickness?: number;
                        width_percent?: number;
                        padding?: {
                            top: number;
                            right: number;
                            bottom: number;
                            left: number;
                        };
                    } | {
                        id: string;
                        /** @constant */
                        type: "spacer";
                        height: number;
                    } | {
                        id: string;
                        /** @constant */
                        type: "social";
                        /** @enum {string} */
                        align?: "left" | "center" | "right";
                        icon_size?: number;
                        items: {
                            /** @enum {string} */
                            network: "facebook" | "x" | "instagram" | "linkedin" | "youtube" | "pinterest" | "github" | "web";
                            href: string;
                            label?: string;
                        }[];
                    } | {
                        id: string;
                        /** @constant */
                        type: "html";
                        html: string;
                    };
                };
                created_by: string | null;
                created_at: string;
            }[];
        };
        InAppTemplate: {
            id: string;
            /** @enum {string} */
            source: "system" | "org";
            /** @enum {string} */
            category: "welcome" | "promotion" | "cart" | "survey" | "rating" | "onboarding" | "update" | "permission" | "newsletter" | "announcement" | "loyalty" | "custom";
            name: string;
            description: string | null;
            display: {
                /** @enum {string} */
                layout: "modal" | "banner_top" | "banner_bottom" | "fullscreen";
                background_color?: string;
                text_color?: string;
                dismissible?: boolean;
                auto_dismiss_seconds?: number;
                /** @enum {string} */
                content_type?: "blocks" | "html";
                html?: {
                    [key: string]: string;
                };
                html_height?: number;
                blocks: ({
                    /** @constant */
                    type: "image";
                    url: string;
                    alt?: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "title";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "body";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "button";
                    id: string;
                    text: {
                        [key: string]: string;
                    };
                    action: {
                        /** @constant */
                        type: "dismiss";
                    } | {
                        /** @constant */
                        type: "push_prompt";
                    } | {
                        /** @constant */
                        type: "outcome";
                        name: string;
                        value?: number;
                    } | {
                        /** @constant */
                        type: "url";
                        url: string;
                    } | {
                        /** @constant */
                        type: "deeplink";
                        url: string;
                    } | {
                        /** @constant */
                        type: "tags";
                        tags: {
                            [key: string]: string;
                        };
                    };
                    background_color?: string;
                    text_color?: string;
                } | {
                    /** @constant */
                    type: "carousel";
                    id: string;
                    cards: {
                        id: string;
                        title: {
                            [key: string]: string;
                        };
                        body?: {
                            [key: string]: string;
                        };
                        image_url?: string;
                        image_alt?: {
                            [key: string]: string;
                        };
                        button?: {
                            id: string;
                            text: {
                                [key: string]: string;
                            };
                            action: {
                                /** @constant */
                                type: "dismiss";
                            } | {
                                /** @constant */
                                type: "push_prompt";
                            } | {
                                /** @constant */
                                type: "outcome";
                                name: string;
                                value?: number;
                            } | {
                                /** @constant */
                                type: "url";
                                url: string;
                            } | {
                                /** @constant */
                                type: "deeplink";
                                url: string;
                            } | {
                                /** @constant */
                                type: "tags";
                                tags: {
                                    [key: string]: string;
                                };
                            };
                        };
                    }[];
                })[];
            };
            created_at: string | null;
            updated_at: string | null;
        };
        InAppTemplateList: {
            gallery_version: string;
            data: {
                id: string;
                /** @enum {string} */
                source: "system" | "org";
                /** @enum {string} */
                category: "welcome" | "promotion" | "cart" | "survey" | "rating" | "onboarding" | "update" | "permission" | "newsletter" | "announcement" | "loyalty" | "custom";
                name: string;
                description: string | null;
                display: {
                    /** @enum {string} */
                    layout: "modal" | "banner_top" | "banner_bottom" | "fullscreen";
                    background_color?: string;
                    text_color?: string;
                    dismissible?: boolean;
                    auto_dismiss_seconds?: number;
                    /** @enum {string} */
                    content_type?: "blocks" | "html";
                    html?: {
                        [key: string]: string;
                    };
                    html_height?: number;
                    blocks: ({
                        /** @constant */
                        type: "image";
                        url: string;
                        alt?: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "title";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "body";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "button";
                        id: string;
                        text: {
                            [key: string]: string;
                        };
                        action: {
                            /** @constant */
                            type: "dismiss";
                        } | {
                            /** @constant */
                            type: "push_prompt";
                        } | {
                            /** @constant */
                            type: "outcome";
                            name: string;
                            value?: number;
                        } | {
                            /** @constant */
                            type: "url";
                            url: string;
                        } | {
                            /** @constant */
                            type: "deeplink";
                            url: string;
                        } | {
                            /** @constant */
                            type: "tags";
                            tags: {
                                [key: string]: string;
                            };
                        };
                        background_color?: string;
                        text_color?: string;
                    } | {
                        /** @constant */
                        type: "carousel";
                        id: string;
                        cards: {
                            id: string;
                            title: {
                                [key: string]: string;
                            };
                            body?: {
                                [key: string]: string;
                            };
                            image_url?: string;
                            image_alt?: {
                                [key: string]: string;
                            };
                            button?: {
                                id: string;
                                text: {
                                    [key: string]: string;
                                };
                                action: {
                                    /** @constant */
                                    type: "dismiss";
                                } | {
                                    /** @constant */
                                    type: "push_prompt";
                                } | {
                                    /** @constant */
                                    type: "outcome";
                                    name: string;
                                    value?: number;
                                } | {
                                    /** @constant */
                                    type: "url";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "deeplink";
                                    url: string;
                                } | {
                                    /** @constant */
                                    type: "tags";
                                    tags: {
                                        [key: string]: string;
                                    };
                                };
                            };
                        }[];
                    })[];
                };
                created_at: string | null;
                updated_at: string | null;
            }[];
        };
        DataFeed: {
            id: string;
            app_id: string;
            name: string;
            description: string | null;
            url_template: string;
            /** @enum {string} */
            method: "GET" | "POST";
            body_template: string | null;
            headers: {
                [key: string]: string;
            };
            secret_header_names: string[];
            cache_ttl_seconds: number;
            timeout_ms: number;
            enabled: boolean;
            liquid: string;
            created_at: string;
            updated_at: string;
        };
        DataFeedList: {
            data: {
                id: string;
                app_id: string;
                name: string;
                description: string | null;
                url_template: string;
                /** @enum {string} */
                method: "GET" | "POST";
                body_template: string | null;
                headers: {
                    [key: string]: string;
                };
                secret_header_names: string[];
                cache_ttl_seconds: number;
                timeout_ms: number;
                enabled: boolean;
                liquid: string;
                created_at: string;
                updated_at: string;
            }[];
        };
        DataFeedTestResult: {
            /** @enum {string} */
            status: "ok" | "cached" | "timeout" | "error" | "circuit_open" | "blocked" | "invalid_json" | "too_large" | "http_error";
            http_status: number | null;
            duration_ms: number;
            error: string | null;
            url: string | null;
            preview: unknown;
            truncated: boolean;
            user: {
                id: string;
                external_id: string | null;
            } | null;
        };
        ContentTable: {
            id: string;
            app_id: string;
            name: string;
            description: string | null;
            key_column: string;
            columns: string[];
            row_count: number;
            version: number;
            source_file_name: string | null;
            liquid: string;
            created_at: string;
            updated_at: string;
        };
        ContentTableList: {
            data: {
                id: string;
                app_id: string;
                name: string;
                description: string | null;
                key_column: string;
                columns: string[];
                row_count: number;
                version: number;
                source_file_name: string | null;
                liquid: string;
                created_at: string;
                updated_at: string;
            }[];
        };
        ContentTableRows: {
            columns: string[];
            key_column: string;
            total: number;
            data: {
                [key: string]: string;
            }[];
        };
        SsoConnection: {
            id: string;
            /** @enum {string} */
            type: "saml" | "oidc";
            name: string;
            /** @enum {string} */
            status: "draft" | "active" | "disabled";
            config: {
                idp_entity_id?: string;
                /** Format: uri */
                idp_sso_url?: string;
                idp_certificates?: string[];
                allow_idp_initiated?: boolean;
                groups_attribute?: string;
                email_attribute?: string;
                name_attribute?: string;
                /** Format: uri */
                issuer?: string;
                client_id?: string;
                /** Format: uri */
                authorization_endpoint?: string;
                /** Format: uri */
                token_endpoint?: string;
                /** Format: uri */
                jwks_uri?: string;
                scopes?: string[];
                groups_claim?: string;
            };
            has_client_secret: boolean;
            default_role: string;
            group_role_map: {
                [key: string]: string;
            };
            jit_enabled: boolean;
            last_login_at: string | null;
            sp: {
                entity_id: string;
                acs_url: string;
                metadata_url: string;
                redirect_uri: string;
            };
            created_at: string;
            updated_at: string;
        };
        SsoConnectionList: {
            data: {
                id: string;
                /** @enum {string} */
                type: "saml" | "oidc";
                name: string;
                /** @enum {string} */
                status: "draft" | "active" | "disabled";
                config: {
                    idp_entity_id?: string;
                    /** Format: uri */
                    idp_sso_url?: string;
                    idp_certificates?: string[];
                    allow_idp_initiated?: boolean;
                    groups_attribute?: string;
                    email_attribute?: string;
                    name_attribute?: string;
                    /** Format: uri */
                    issuer?: string;
                    client_id?: string;
                    /** Format: uri */
                    authorization_endpoint?: string;
                    /** Format: uri */
                    token_endpoint?: string;
                    /** Format: uri */
                    jwks_uri?: string;
                    scopes?: string[];
                    groups_claim?: string;
                };
                has_client_secret: boolean;
                default_role: string;
                group_role_map: {
                    [key: string]: string;
                };
                jit_enabled: boolean;
                last_login_at: string | null;
                sp: {
                    entity_id: string;
                    acs_url: string;
                    metadata_url: string;
                    redirect_uri: string;
                };
                created_at: string;
                updated_at: string;
            }[];
        };
        SsoDomain: {
            id: string;
            domain: string;
            verified: boolean;
            verified_at: string | null;
            last_checked_at: string | null;
            txt_record: {
                name: string;
                value: string;
            };
            created_at: string;
        };
        SsoDomainList: {
            data: {
                id: string;
                domain: string;
                verified: boolean;
                verified_at: string | null;
                last_checked_at: string | null;
                txt_record: {
                    name: string;
                    value: string;
                };
                created_at: string;
            }[];
        };
        SsoSettings: {
            enforced: boolean;
            available: boolean;
            scim_available: boolean;
            recovery_codes?: string[];
            recovery_codes_remaining: number | null;
        };
        SsoDiscoverResult: {
            sso: boolean;
            type: ("saml" | "oidc") | null;
            start_url: string | null;
        };
        SsoTestStart: {
            url: string;
        };
        SsoTestResult: {
            connection_id: string;
            ok: boolean;
            error: string | null;
            email: string | null;
            name: string | null;
            groups: string[];
            mapped_role: string | null;
            domain_verified: boolean;
            account_exists: boolean;
            member: boolean;
            claims: {
                [key: string]: unknown;
            };
            tested_at: string;
        };
        ScimTokenList: {
            data: {
                id: string;
                name: string;
                prefix: string;
                last_used_at: string | null;
                revoked_at: string | null;
                created_at: string;
            }[];
        };
        ScimTokenCreated: {
            token: string;
            scim_base_url: string;
            data: {
                id: string;
                name: string;
                prefix: string;
                last_used_at: string | null;
                revoked_at: string | null;
                created_at: string;
            };
        };
        AppTransfer: {
            id: string;
            app_id: string;
            app_name: string | null;
            from_org: {
                id: string;
                name: string | null;
                slug: string | null;
            };
            to_org: {
                id: string;
                name: string | null;
                slug: string | null;
            };
            /** @enum {string} */
            status: "pending" | "completed" | "cancelled" | "rejected" | "failed";
            source_approved_at: string | null;
            target_approved_at: string | null;
            completed_at: string | null;
            failure_reason: string | null;
            created_at: string;
        };
        AppTransferList: {
            data: {
                id: string;
                app_id: string;
                app_name: string | null;
                from_org: {
                    id: string;
                    name: string | null;
                    slug: string | null;
                };
                to_org: {
                    id: string;
                    name: string | null;
                    slug: string | null;
                };
                /** @enum {string} */
                status: "pending" | "completed" | "cancelled" | "rejected" | "failed";
                source_approved_at: string | null;
                target_approved_at: string | null;
                completed_at: string | null;
                failure_reason: string | null;
                created_at: string;
            }[];
        };
        RequestLog: {
            id: string;
            org_id: string;
            app_id: string | null;
            api_key_id: string | null;
            method: string;
            path: string;
            route: string | null;
            status: number;
            duration_ms: number;
            request_id: string | null;
            ip: string | null;
            error_code: string | null;
            created_at: string;
        };
        RequestLogPage: {
            data: {
                id: string;
                org_id: string;
                app_id: string | null;
                api_key_id: string | null;
                method: string;
                path: string;
                route: string | null;
                status: number;
                duration_ms: number;
                request_id: string | null;
                ip: string | null;
                error_code: string | null;
                created_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        SdkErrorPage: {
            data: {
                id: string;
                app_id: string;
                subscription_id: string | null;
                platform: string;
                sdk_version: string | null;
                level: string;
                code: string | null;
                message: string;
                context: {
                    [key: string]: unknown;
                };
                occurred_at: string;
                created_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        SdkErrorsAccepted: {
            accepted: number;
        };
        Webhook: {
            id: string;
            app_id: string;
            url: string;
            description: string | null;
            events: string[];
            event_filters: {
                event_names?: string[];
            };
            batch: boolean;
            /** @enum {string} */
            status: "active" | "failing" | "disabled";
            disabled_reason: string | null;
            failure_count: number;
            failing_since: string | null;
            last_success_at: string | null;
            last_failure_at: string | null;
            header_names: string[];
            previous_secret_expires_at: string | null;
            body_template: string | null;
            /** @enum {string} */
            body_content_type: "application/json" | "text/plain";
            filters: {
                /** @enum {string} */
                match: "all" | "any";
                conditions: {
                    field: string;
                    /** @enum {string} */
                    op: "eq" | "neq" | "in" | "not_in" | "starts_with" | "contains" | "exists" | "not_exists";
                    value?: (string | number | boolean) | (string | number)[];
                }[];
            } | null;
            created_at: string;
            updated_at: string;
        };
        WebhookList: {
            data: {
                id: string;
                app_id: string;
                url: string;
                description: string | null;
                events: string[];
                event_filters: {
                    event_names?: string[];
                };
                batch: boolean;
                /** @enum {string} */
                status: "active" | "failing" | "disabled";
                disabled_reason: string | null;
                failure_count: number;
                failing_since: string | null;
                last_success_at: string | null;
                last_failure_at: string | null;
                header_names: string[];
                previous_secret_expires_at: string | null;
                body_template: string | null;
                /** @enum {string} */
                body_content_type: "application/json" | "text/plain";
                filters: {
                    /** @enum {string} */
                    match: "all" | "any";
                    conditions: {
                        field: string;
                        /** @enum {string} */
                        op: "eq" | "neq" | "in" | "not_in" | "starts_with" | "contains" | "exists" | "not_exists";
                        value?: (string | number | boolean) | (string | number)[];
                    }[];
                } | null;
                created_at: string;
                updated_at: string;
            }[];
        };
        WebhookWithSecret: {
            id: string;
            app_id: string;
            url: string;
            description: string | null;
            events: string[];
            event_filters: {
                event_names?: string[];
            };
            batch: boolean;
            /** @enum {string} */
            status: "active" | "failing" | "disabled";
            disabled_reason: string | null;
            failure_count: number;
            failing_since: string | null;
            last_success_at: string | null;
            last_failure_at: string | null;
            header_names: string[];
            previous_secret_expires_at: string | null;
            body_template: string | null;
            /** @enum {string} */
            body_content_type: "application/json" | "text/plain";
            filters: {
                /** @enum {string} */
                match: "all" | "any";
                conditions: {
                    field: string;
                    /** @enum {string} */
                    op: "eq" | "neq" | "in" | "not_in" | "starts_with" | "contains" | "exists" | "not_exists";
                    value?: (string | number | boolean) | (string | number)[];
                }[];
            } | null;
            created_at: string;
            updated_at: string;
            /** @description Yalnızca oluşturma ve rotasyon yanıtında bir kez döner. */
            secret: string;
        };
        WebhookSecret: {
            secret: string;
        };
        WebhookEventTypes: {
            data: string[];
        };
        WebhookDeliveryPage: {
            data: {
                id: string;
                endpoint_id: string;
                event_type: string;
                event_id: string;
                subject_id: string | null;
                attempt: number;
                /** @enum {string} */
                status: "pending" | "success" | "failed" | "dead";
                response_status: number | null;
                response_body_excerpt: string | null;
                error: string | null;
                duration_ms: number | null;
                next_retry_at: string | null;
                delivered_at: string | null;
                replay_of: string | null;
                created_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        WebhookDeliveryDetail: {
            id: string;
            endpoint_id: string;
            event_type: string;
            event_id: string;
            subject_id: string | null;
            attempt: number;
            /** @enum {string} */
            status: "pending" | "success" | "failed" | "dead";
            response_status: number | null;
            response_body_excerpt: string | null;
            error: string | null;
            duration_ms: number | null;
            next_retry_at: string | null;
            delivered_at: string | null;
            replay_of: string | null;
            created_at: string;
            payload: {
                [key: string]: unknown;
            };
        };
        WebhookBulkReplayResult: {
            replayed: number;
        };
        WebhookPreviewResult: {
            payload: {
                [key: string]: unknown;
            };
            /** @description Olay filtreden geçer mi (geçmezse gönderilmez). */
            matched: boolean;
            failed_conditions: {
                field: string;
                op: string;
                value?: unknown;
            }[];
            body: string | null;
            content_type: string;
            error: {
                code: string;
                message: string;
            } | null;
        };
        WarehouseExportCreate: {
            name: string;
            tables: ("deliveries" | "delivery_events" | "events" | "conversions" | "users" | "subscriptions")[];
            /** @enum {string} */
            schedule: "hourly" | "daily";
            enabled?: boolean;
            /** @constant */
            destination: "bigquery";
            config: {
                project_id: string;
                dataset: string;
                location?: string;
                table_prefix?: string;
            };
            credentials: {
                /** @description Google Cloud servis hesabı anahtar dosyasının (JSON) içeriği. */
                service_account_json: string;
            };
        } | {
            name: string;
            tables: ("deliveries" | "delivery_events" | "events" | "conversions" | "users" | "subscriptions")[];
            /** @enum {string} */
            schedule: "hourly" | "daily";
            enabled?: boolean;
            /** @constant */
            destination: "snowflake";
            config: {
                account: string;
                user: string;
                database: string;
                schema: string;
                warehouse: string;
                role?: string;
                table_prefix?: string;
            };
            credentials: {
                /** @description Şifresiz PKCS#8 PEM özel anahtar (genel anahtar Snowflake kullanıcısına atanmış olmalı). */
                private_key: string;
            };
        } | {
            name: string;
            tables: ("deliveries" | "delivery_events" | "events" | "conversions" | "users" | "subscriptions")[];
            /** @enum {string} */
            schedule: "hourly" | "daily";
            enabled?: boolean;
            /** @constant */
            destination: "s3_parquet";
            config: {
                bucket: string;
                region: string;
                prefix?: string;
                /** Format: uri */
                endpoint?: string;
                force_path_style?: boolean;
            };
            credentials: {
                access_key_id: string;
                secret_access_key: string;
            };
        };
        WarehouseConnectionTest: {
            /** @constant */
            destination: "bigquery";
            config: {
                project_id: string;
                dataset: string;
                location?: string;
                table_prefix?: string;
            };
            credentials: {
                /** @description Google Cloud servis hesabı anahtar dosyasının (JSON) içeriği. */
                service_account_json: string;
            };
        } | {
            /** @constant */
            destination: "snowflake";
            config: {
                account: string;
                user: string;
                database: string;
                schema: string;
                warehouse: string;
                role?: string;
                table_prefix?: string;
            };
            credentials: {
                /** @description Şifresiz PKCS#8 PEM özel anahtar (genel anahtar Snowflake kullanıcısına atanmış olmalı). */
                private_key: string;
            };
        } | {
            /** @constant */
            destination: "s3_parquet";
            config: {
                bucket: string;
                region: string;
                prefix?: string;
                /** Format: uri */
                endpoint?: string;
                force_path_style?: boolean;
            };
            credentials: {
                access_key_id: string;
                secret_access_key: string;
            };
        };
        WarehouseExport: {
            id: string;
            app_id: string;
            name: string;
            /** @enum {string} */
            destination: "bigquery" | "snowflake" | "s3_parquet";
            config: {
                [key: string]: unknown;
            };
            credentials_hint: string;
            tables: ("deliveries" | "delivery_events" | "events" | "conversions" | "users" | "subscriptions")[];
            /** @enum {string} */
            schedule: "hourly" | "daily";
            enabled: boolean;
            /** @enum {string} */
            status: "active" | "paused" | "failing";
            consecutive_failures: number;
            last_error: string | null;
            cursors: {
                [key: string]: {
                    ts: string;
                    id: string;
                };
            };
            schema_versions: {
                [key: string]: number;
            };
            last_run_at: string | null;
            last_success_at: string | null;
            next_run_at: string | null;
            created_at: string;
            updated_at: string;
        };
        WarehouseExportList: {
            data: {
                id: string;
                app_id: string;
                name: string;
                /** @enum {string} */
                destination: "bigquery" | "snowflake" | "s3_parquet";
                config: {
                    [key: string]: unknown;
                };
                credentials_hint: string;
                tables: ("deliveries" | "delivery_events" | "events" | "conversions" | "users" | "subscriptions")[];
                /** @enum {string} */
                schedule: "hourly" | "daily";
                enabled: boolean;
                /** @enum {string} */
                status: "active" | "paused" | "failing";
                consecutive_failures: number;
                last_error: string | null;
                cursors: {
                    [key: string]: {
                        ts: string;
                        id: string;
                    };
                };
                schema_versions: {
                    [key: string]: number;
                };
                last_run_at: string | null;
                last_success_at: string | null;
                next_run_at: string | null;
                created_at: string;
                updated_at: string;
            }[];
        };
        WarehouseExportRun: {
            id: string;
            export_id: string;
            /** @enum {string} */
            trigger: "schedule" | "manual";
            /** @enum {string} */
            status: "queued" | "running" | "succeeded" | "failed";
            tables: {
                [key: string]: {
                    rows: number;
                    schema_version: number;
                    from: {
                        ts: string;
                        id: string;
                    } | null;
                    to: {
                        ts: string;
                        id: string;
                    } | null;
                    objects: number;
                };
            };
            row_count: number;
            attempt: number;
            error: string | null;
            started_at: string | null;
            finished_at: string | null;
            duration_ms: number | null;
            created_at: string;
        };
        WarehouseExportRunPage: {
            data: {
                id: string;
                export_id: string;
                /** @enum {string} */
                trigger: "schedule" | "manual";
                /** @enum {string} */
                status: "queued" | "running" | "succeeded" | "failed";
                tables: {
                    [key: string]: {
                        rows: number;
                        schema_version: number;
                        from: {
                            ts: string;
                            id: string;
                        } | null;
                        to: {
                            ts: string;
                            id: string;
                        } | null;
                        objects: number;
                    };
                };
                row_count: number;
                attempt: number;
                error: string | null;
                started_at: string | null;
                finished_at: string | null;
                duration_ms: number | null;
                created_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        WarehouseConnectionResult: {
            ok: boolean;
            detail: string | null;
            error: {
                code: string;
                message: string;
            } | null;
        };
        WarehouseTables: {
            data: {
                /** @enum {string} */
                name: "deliveries" | "delivery_events" | "events" | "conversions" | "users" | "subscriptions";
                /** @enum {string} */
                mode: "incremental" | "snapshot";
                schema_version: number;
                cursor_column: string | null;
                columns: {
                    name: string;
                    type: string;
                    nullable: boolean;
                }[];
            }[];
        };
        Integration: {
            id: string;
            app_id: string;
            /** @enum {string} */
            type: "segment" | "amplitude" | "mixpanel" | "zapier" | "slack";
            name: string;
            /** @enum {string} */
            status: "active" | "paused" | "error";
            settings: {
                [key: string]: unknown;
            };
            events: string[];
            credentials: {
                [key: string]: string;
            };
            state: {
                [key: string]: unknown;
            };
            inbound_url: string | null;
            interactions_url: string | null;
            pending_events: number;
            dead_events: number;
            hooks: number;
            consecutive_failures: number;
            last_error: string | null;
            last_error_at: string | null;
            last_success_at: string | null;
            last_run_at: string | null;
            next_sync_at: string | null;
            created_at: string;
            updated_at: string;
        };
        IntegrationList: {
            data: {
                id: string;
                app_id: string;
                /** @enum {string} */
                type: "segment" | "amplitude" | "mixpanel" | "zapier" | "slack";
                name: string;
                /** @enum {string} */
                status: "active" | "paused" | "error";
                settings: {
                    [key: string]: unknown;
                };
                events: string[];
                credentials: {
                    [key: string]: string;
                };
                state: {
                    [key: string]: unknown;
                };
                inbound_url: string | null;
                interactions_url: string | null;
                pending_events: number;
                dead_events: number;
                hooks: number;
                consecutive_failures: number;
                last_error: string | null;
                last_error_at: string | null;
                last_success_at: string | null;
                last_run_at: string | null;
                next_sync_at: string | null;
                created_at: string;
                updated_at: string;
            }[];
            catalog: {
                /** @enum {string} */
                type: "segment" | "amplitude" | "mixpanel" | "zapier" | "slack";
                events: string[];
                cohorts: boolean;
                inbound: boolean;
            }[];
        };
        IntegrationRunList: {
            data: {
                id: string;
                /** @enum {string} */
                kind: "cohort_sync" | "event_export" | "hook_delivery" | "inbound" | "notification" | "test";
                /** @enum {string} */
                trigger: "schedule" | "manual" | "event" | "inbound";
                /** @enum {string} */
                status: "running" | "succeeded" | "partial" | "failed";
                stats: {
                    [key: string]: number;
                };
                error: string | null;
                started_at: string;
                finished_at: string | null;
                duration_ms: number | null;
            }[];
        };
        IntegrationTestResult: {
            ok: boolean;
            error: string | null;
            run_id: string;
        };
        IntegrationSyncResult: {
            /** @constant */
            queued: true;
            next_sync_at: string;
        };
        IntegrationOk: {
            /** @constant */
            ok: true;
        };
        ZapierHook: {
            id: string;
            event: string;
            event_name: string | null;
            target_url: string;
            last_delivered_at: string | null;
            failure_count: number;
            created_at: string;
        };
        ZapierHookList: {
            data: {
                id: string;
                event: string;
                event_name: string | null;
                target_url: string;
                last_delivered_at: string | null;
                failure_count: number;
                created_at: string;
            }[];
        };
        ZapierMe: {
            app_id: string;
            app_name: string;
            org_id: string;
            scopes: string[];
        };
        ZapierSamples: {
            id: string;
            type: string;
            created_at: string;
            app_id: string;
            data: {
                [key: string]: unknown;
            };
        }[];
        AdPlatformList: {
            data: {
                /** @enum {string} */
                platform: "meta" | "google" | "tiktok" | "linkedin";
                enabled: boolean;
                mock: boolean;
                identifiers: ("email" | "phone" | "maid")[];
                lookalike: boolean;
                batch_size: number;
            }[];
        };
        AdAccount: {
            id: string;
            app_id: string;
            /** @enum {string} */
            platform: "meta" | "google" | "tiktok" | "linkedin";
            external_id: string;
            name: string;
            currency: string | null;
            timezone: string | null;
            /** @enum {string} */
            status: "active" | "error" | "revoked";
            scopes: string[];
            login_customer_id: string | null;
            token_expires_at: string | null;
            last_refreshed_at: string | null;
            last_error: string | null;
            last_error_at: string | null;
            terms_accepted_at: string | null;
            terms_version: string | null;
            audiences: number;
            created_at: string;
            updated_at: string;
        };
        AdAccountList: {
            data: {
                id: string;
                app_id: string;
                /** @enum {string} */
                platform: "meta" | "google" | "tiktok" | "linkedin";
                external_id: string;
                name: string;
                currency: string | null;
                timezone: string | null;
                /** @enum {string} */
                status: "active" | "error" | "revoked";
                scopes: string[];
                login_customer_id: string | null;
                token_expires_at: string | null;
                last_refreshed_at: string | null;
                last_error: string | null;
                last_error_at: string | null;
                terms_accepted_at: string | null;
                terms_version: string | null;
                audiences: number;
                created_at: string;
                updated_at: string;
            }[];
        };
        AdOAuthStartResult: {
            url: string;
            /** @enum {string} */
            platform: "meta" | "google" | "tiktok" | "linkedin";
        };
        AdOAuthPending: {
            /** @enum {string} */
            platform: "meta" | "google" | "tiktok" | "linkedin";
            scopes: string[];
            accounts: {
                external_id: string;
                name: string;
                currency: string | null;
                timezone: string | null;
                status: string | null;
                manager_id: string | null;
                already_connected: boolean;
            }[];
        };
        AdAudience: {
            id: string;
            app_id: string;
            ad_account_id: string;
            /** @enum {string} */
            platform: "meta" | "google" | "tiktok" | "linkedin";
            /** @enum {string} */
            source: "segment" | "journey" | "lookalike";
            segment_id: string | null;
            segment_name: string | null;
            name: string;
            description: string | null;
            external_id: string | null;
            /** @enum {string} */
            status: "pending" | "active" | "paused" | "error";
            identifiers: ("email" | "phone" | "maid")[];
            sync_interval_minutes: number;
            next_sync_at: string | null;
            last_synced_at: string | null;
            last_sync_status: ("succeeded" | "partial" | "failed") | null;
            full_reload_requested: boolean;
            member_count: number;
            estimated_size: number | null;
            match_rate: number | null;
            size_updated_at: string | null;
            lookalike_source_id: string | null;
            lookalike_spec: {
                country: string;
                ratio: number;
            } | null;
            consecutive_failures: number;
            last_error: string | null;
            last_error_at: string | null;
            created_at: string;
            updated_at: string;
        };
        AdAudienceList: {
            data: {
                id: string;
                app_id: string;
                ad_account_id: string;
                /** @enum {string} */
                platform: "meta" | "google" | "tiktok" | "linkedin";
                /** @enum {string} */
                source: "segment" | "journey" | "lookalike";
                segment_id: string | null;
                segment_name: string | null;
                name: string;
                description: string | null;
                external_id: string | null;
                /** @enum {string} */
                status: "pending" | "active" | "paused" | "error";
                identifiers: ("email" | "phone" | "maid")[];
                sync_interval_minutes: number;
                next_sync_at: string | null;
                last_synced_at: string | null;
                last_sync_status: ("succeeded" | "partial" | "failed") | null;
                full_reload_requested: boolean;
                member_count: number;
                estimated_size: number | null;
                match_rate: number | null;
                size_updated_at: string | null;
                lookalike_source_id: string | null;
                lookalike_spec: {
                    country: string;
                    ratio: number;
                } | null;
                consecutive_failures: number;
                last_error: string | null;
                last_error_at: string | null;
                created_at: string;
                updated_at: string;
            }[];
        };
        AdAudienceSyncList: {
            data: {
                id: string;
                audience_id: string;
                /** @enum {string} */
                trigger: "schedule" | "manual" | "journey";
                /** @enum {string} */
                mode: "incremental" | "full";
                /** @enum {string} */
                status: "running" | "succeeded" | "partial" | "failed";
                added: number;
                removed: number;
                failed: number;
                skipped_no_consent: number;
                skipped_no_identifier: number;
                batches: number;
                retries: number;
                error: string | null;
                started_at: string;
                finished_at: string | null;
                duration_ms: number | null;
            }[];
        };
        AdAudienceSyncQueued: {
            /** @constant */
            queued: true;
            next_sync_at: string;
            /** @enum {string} */
            mode: "incremental" | "full";
        };
        AdOk: {
            /** @constant */
            ok: true;
        };
        AdEntity: {
            id: string;
            app_id: string;
            ad_account_id: string;
            /** @enum {string} */
            platform: "meta" | "google" | "tiktok";
            /** @enum {string} */
            level: "campaign" | "ad_set" | "ad";
            external_id: string;
            campaign_external_id: string;
            ad_set_external_id: string | null;
            name: string;
            /** @enum {string} */
            status: "active" | "paused" | "pending" | "rejected" | "archived" | "deleted" | "unknown";
            platform_status: string | null;
            objective: string | null;
            optimization_goal: string | null;
            currency: string | null;
            daily_budget: string | null;
            lifetime_budget: string | null;
            start_at: string | null;
            end_at: string | null;
            audience_external_ids: string[];
            creative: {
                title: string | null;
                body: string | null;
                description: string | null;
                link_url: string | null;
                image_url: string | null;
                call_to_action: string | null;
            } | null;
            budget_editable: boolean;
            created_by_pushizo: boolean;
            last_seen_at: string | null;
            platform_url: string;
            metrics: {
                impressions: number;
                clicks: number;
                spend: number;
                conversions: number;
                conversion_value: number;
                ctr: number | null;
                cpc: number | null;
                roas: number | null;
            } | null;
            updated_at: string;
        };
        AdEntityList: {
            data: {
                id: string;
                app_id: string;
                ad_account_id: string;
                /** @enum {string} */
                platform: "meta" | "google" | "tiktok";
                /** @enum {string} */
                level: "campaign" | "ad_set" | "ad";
                external_id: string;
                campaign_external_id: string;
                ad_set_external_id: string | null;
                name: string;
                /** @enum {string} */
                status: "active" | "paused" | "pending" | "rejected" | "archived" | "deleted" | "unknown";
                platform_status: string | null;
                objective: string | null;
                optimization_goal: string | null;
                currency: string | null;
                daily_budget: string | null;
                lifetime_budget: string | null;
                start_at: string | null;
                end_at: string | null;
                audience_external_ids: string[];
                creative: {
                    title: string | null;
                    body: string | null;
                    description: string | null;
                    link_url: string | null;
                    image_url: string | null;
                    call_to_action: string | null;
                } | null;
                budget_editable: boolean;
                created_by_pushizo: boolean;
                last_seen_at: string | null;
                platform_url: string;
                metrics: {
                    impressions: number;
                    clicks: number;
                    spend: number;
                    conversions: number;
                    conversion_value: number;
                    ctr: number | null;
                    cpc: number | null;
                    roas: number | null;
                } | null;
                updated_at: string;
            }[];
            from: string;
            to: string;
            accounts: {
                id: string;
                campaigns_synced_at: string | null;
                insights_synced_at: string | null;
                campaigns_sync_error: string | null;
                insights_sync_error: string | null;
            }[];
        };
        AdRefreshQueued: {
            /** @constant */
            queued: true;
            next_sync_at: string;
        };
        AdCampaignPreview: {
            preview_url: string | null;
            platform_url: string;
            creative: {
                title: string | null;
                body: string | null;
                description: string | null;
                link_url: string | null;
                image_url: string | null;
                call_to_action: string | null;
            } | null;
        };
        AdPageList: {
            data: {
                id: string;
                name: string;
            }[];
        };
        AdCreative: {
            id: string;
            file_name: string | null;
            content_type: string;
            bytes: number;
            width: number | null;
            height: number | null;
            preview_url: string;
            created_at: string;
        };
        AdCampaignCreated: {
            campaign: {
                id: string;
                app_id: string;
                ad_account_id: string;
                /** @enum {string} */
                platform: "meta" | "google" | "tiktok";
                /** @enum {string} */
                level: "campaign" | "ad_set" | "ad";
                external_id: string;
                campaign_external_id: string;
                ad_set_external_id: string | null;
                name: string;
                /** @enum {string} */
                status: "active" | "paused" | "pending" | "rejected" | "archived" | "deleted" | "unknown";
                platform_status: string | null;
                objective: string | null;
                optimization_goal: string | null;
                currency: string | null;
                daily_budget: string | null;
                lifetime_budget: string | null;
                start_at: string | null;
                end_at: string | null;
                audience_external_ids: string[];
                creative: {
                    title: string | null;
                    body: string | null;
                    description: string | null;
                    link_url: string | null;
                    image_url: string | null;
                    call_to_action: string | null;
                } | null;
                budget_editable: boolean;
                created_by_pushizo: boolean;
                last_seen_at: string | null;
                platform_url: string;
                metrics: {
                    impressions: number;
                    clicks: number;
                    spend: number;
                    conversions: number;
                    conversion_value: number;
                    ctr: number | null;
                    cpc: number | null;
                    roas: number | null;
                } | null;
                updated_at: string;
            };
            ad_set_id: string;
            ad_id: string | null;
            warnings: string[];
            platform_url: string;
        };
        AdSpendReport: {
            from: string;
            to: string;
            currency: string;
            group_by: string;
            rows: {
                key: string;
                label: string;
                platform: string | null;
                impressions: number;
                clicks: number;
                spend: number;
                conversions: number;
                conversion_value: number;
                ctr: number | null;
                cpc: number | null;
                cpa: number | null;
                roas: number | null;
            }[];
            totals: {
                impressions: number;
                clicks: number;
                spend: number;
                conversions: number;
                conversion_value: number;
                ctr: number | null;
                cpc: number | null;
                cpa: number | null;
                roas: number | null;
            };
            fx_missing: string[];
            /** @enum {string} */
            store: "postgres" | "clickhouse";
        };
        AdAttributionReport: {
            from: string;
            to: string;
            /** @enum {string} */
            model: "last_click" | "first_click" | "linear" | "time_decay";
            window_days: number;
            half_life_days: number;
            currency: string;
            group_by: string;
            conversion_events: string[];
            rows: {
                key: string;
                /** @enum {string} */
                channel: "meta" | "google" | "tiktok" | "linkedin" | "microsoft" | "other_paid" | "utm" | "push" | "email" | "sms" | "whatsapp" | "rcs" | "direct";
                label: string;
                paid: boolean;
                conversions: number;
                revenue: number;
                new_customers: number;
                spend: number | null;
                roas: number | null;
                cac: number | null;
            }[];
            totals: {
                conversions: number;
                revenue: number;
                spend: number;
                new_customers: number;
                roas: number | null;
                platform_roas: number | null;
                cac: number | null;
                paid_cac: number | null;
            };
            truncated: boolean;
            fx_missing: string[];
        };
        AdLtvReport: {
            currency: string;
            months: number;
            conversion_events: string[];
            cohorts: {
                cohort: string;
                size: number;
                revenue: number[];
                ltv: number[];
            }[];
            average: (number | null)[];
            fx_missing: string[];
        };
        AdReportingSettings: {
            reporting_currency: string;
            /** @enum {string} */
            attribution_model: "last_click" | "first_click" | "linear" | "time_decay";
            window_days: number;
            half_life_days: number;
            conversion_events: string[];
            effective_conversion_events: string[];
            fx: {
                latest_day: string | null;
                source: string | null;
            };
        };
        AdCapiConfig: {
            id: string;
            app_id: string;
            /** @enum {string} */
            platform: "meta" | "google" | "tiktok";
            name: string;
            ad_account_id: string | null;
            enabled: boolean;
            settings: {
                pixel_id: string | null;
                customer_id: string | null;
                login_customer_id: string | null;
                pixel_code: string | null;
            };
            event_mappings: {
                event_name: string;
                platform_event: string;
                value_property: string | null;
                currency_property: string | null;
            }[];
            test_event_code: string | null;
            test_mode: boolean;
            /** @enum {string} */
            action_source: "website" | "app";
            default_currency: string;
            has_access_token: boolean;
            last_sent_at: string | null;
            last_error: string | null;
            last_error_at: string | null;
            stats: {
                pending: number;
                sent: number;
                failed: number;
                skipped: number;
            };
            created_at: string;
            updated_at: string;
        };
        AdCapiConfigList: {
            data: {
                id: string;
                app_id: string;
                /** @enum {string} */
                platform: "meta" | "google" | "tiktok";
                name: string;
                ad_account_id: string | null;
                enabled: boolean;
                settings: {
                    pixel_id: string | null;
                    customer_id: string | null;
                    login_customer_id: string | null;
                    pixel_code: string | null;
                };
                event_mappings: {
                    event_name: string;
                    platform_event: string;
                    value_property: string | null;
                    currency_property: string | null;
                }[];
                test_event_code: string | null;
                test_mode: boolean;
                /** @enum {string} */
                action_source: "website" | "app";
                default_currency: string;
                has_access_token: boolean;
                last_sent_at: string | null;
                last_error: string | null;
                last_error_at: string | null;
                stats: {
                    pending: number;
                    sent: number;
                    failed: number;
                    skipped: number;
                };
                created_at: string;
                updated_at: string;
            }[];
        };
        AdCapiDeliveryList: {
            data: {
                id: string;
                config_id: string;
                /** @enum {string} */
                platform: "meta" | "google" | "tiktok";
                event_id: string;
                event_name: string;
                platform_event: string;
                dedup_id: string;
                user_id: string | null;
                value: number | null;
                currency: string | null;
                /** @enum {string} */
                status: "pending" | "sent" | "failed" | "skipped";
                skip_reason: string | null;
                attempts: number;
                next_attempt_at: string | null;
                last_error: string | null;
                test: boolean;
                event_occurred_at: string;
                sent_at: string | null;
                created_at: string;
            }[];
        };
        AdCapiDelivery: {
            id: string;
            config_id: string;
            /** @enum {string} */
            platform: "meta" | "google" | "tiktok";
            event_id: string;
            event_name: string;
            platform_event: string;
            dedup_id: string;
            user_id: string | null;
            value: number | null;
            currency: string | null;
            /** @enum {string} */
            status: "pending" | "sent" | "failed" | "skipped";
            skip_reason: string | null;
            attempts: number;
            next_attempt_at: string | null;
            last_error: string | null;
            test: boolean;
            event_occurred_at: string;
            sent_at: string | null;
            created_at: string;
        };
        AdCapiTestResult: {
            /** @constant */
            ok: true;
            response: {
                [key: string]: unknown;
            };
        };
        AdBudgetAlertRule: {
            id: string;
            app_id: string;
            name: string;
            /** @enum {string} */
            kind: "daily_spend" | "roas_drop" | "budget_depletion";
            ad_account_id: string | null;
            campaign_external_id: string | null;
            threshold: number;
            window_days: number;
            recipients: string[];
            enabled: boolean;
            last_value: number | null;
            last_evaluated_at: string | null;
            last_triggered_on: string | null;
            created_at: string;
            updated_at: string;
        };
        AdBudgetAlertRuleList: {
            data: {
                id: string;
                app_id: string;
                name: string;
                /** @enum {string} */
                kind: "daily_spend" | "roas_drop" | "budget_depletion";
                ad_account_id: string | null;
                campaign_external_id: string | null;
                threshold: number;
                window_days: number;
                recipients: string[];
                enabled: boolean;
                last_value: number | null;
                last_evaluated_at: string | null;
                last_triggered_on: string | null;
                created_at: string;
                updated_at: string;
            }[];
        };
        AdBudgetAlertList: {
            data: {
                id: string;
                rule_id: string;
                rule_name: string;
                /** @enum {string} */
                kind: "daily_spend" | "roas_drop" | "budget_depletion";
                day: string;
                value: number;
                threshold: number;
                details: {
                    [key: string]: unknown;
                };
                emailed: number;
                created_at: string;
            }[];
        };
        SdkAttributionAccepted: {
            accepted: number;
        };
        OAuthConsentContext: {
            client: {
                client_id: string;
                client_name: string;
                client_uri: string | null;
                redirect_host: string;
            };
            requested_scopes: string[];
            available_scopes: string[];
            deny_url: string;
            organizations: {
                id: string;
                name: string;
                slug: string;
                role: string;
                org_wide_allowed: boolean;
                grantable_scopes: string[];
                apps: {
                    id: string;
                    name: string;
                }[];
            }[];
        };
        OAuthApproveResult: {
            redirect_to: string;
        };
        CellList: {
            enabled: boolean;
            current_cell_id: string | null;
            control_plane: boolean;
            control_plane_dashboard_url: string | null;
            cells: {
                id: string;
                name: string;
                api_url: string;
                dashboard_url: string;
            }[];
        };
        CellOrgList: {
            data: {
                id: string;
                name: string;
                slug: string;
                /** @enum {string} */
                role: "owner" | "admin" | "developer" | "marketer" | "analyst" | "billing" | "viewer" | "composer" | "agent";
                region: string | null;
                dashboard_url: string | null;
                local: boolean;
            }[];
            unavailable_cells: string[];
        };
        CellHandoff: {
            url: string;
            expires_at: string;
        };
        CellHandoffResult: {
            account: {
                id: string;
                email: string;
                name: string;
                locale: string;
                timezone: string;
                email_verified: boolean;
                mfa_enabled: boolean;
                is_platform_admin: boolean;
                has_password: boolean;
                marketing_opt_in: boolean;
                created_at: string;
            };
            next: string | null;
        };
        CustomDomain: {
            id: string;
            /** @enum {string} */
            kind: "dashboard" | "tracking" | "preference_center" | "status_page" | "landing";
            hostname: string;
            /** @enum {string} */
            status: "pending" | "verified" | "active" | "failed";
            verification: {
                txt_name: string;
                txt_value: string;
                cname_target: string | null;
            };
            last_error: string | null;
            last_checked_at: string | null;
            verified_at: string | null;
            activated_at: string | null;
            created_at: string;
        };
        CustomDomainList: {
            data: {
                id: string;
                /** @enum {string} */
                kind: "dashboard" | "tracking" | "preference_center" | "status_page" | "landing";
                hostname: string;
                /** @enum {string} */
                status: "pending" | "verified" | "active" | "failed";
                verification: {
                    txt_name: string;
                    txt_value: string;
                    cname_target: string | null;
                };
                last_error: string | null;
                last_checked_at: string | null;
                verified_at: string | null;
                activated_at: string | null;
                created_at: string;
            }[];
        };
        ResellerChildOrg: {
            id: string;
            name: string;
            slug: string;
            plan_code: string;
            /** @enum {string} */
            status: "active" | "suspended" | "deleted";
            suspended_reason: string | null;
            members: number;
            /** @enum {string} */
            access: "owner" | "member" | "support" | "none";
            region: string | null;
            created_at: string;
        };
        ResellerChildOrgList: {
            data: {
                id: string;
                name: string;
                slug: string;
                plan_code: string;
                /** @enum {string} */
                status: "active" | "suspended" | "deleted";
                suspended_reason: string | null;
                members: number;
                /** @enum {string} */
                access: "owner" | "member" | "support" | "none";
                region: string | null;
                created_at: string;
            }[];
        };
        ResellerStatement: {
            month: string;
            currency: string;
            items: {
                org_id: string;
                name: string;
                slug: string;
                plan_code: string;
                status: string;
                amount: number;
                messages_sent: number;
                events_ingested: number;
                api_requests: number;
                active_subscriptions: number;
                mau: number;
            }[];
            totals: {
                amount: number;
                messages_sent: number;
                events_ingested: number;
                child_orgs: number;
            };
        };
        Branding: {
            product_name: string | null;
            logo_url: string | null;
            primary_color: string | null;
            secondary_color: string | null;
            support_email: string | null;
            hide_powered_by: boolean;
            effective: {
                product_name: string;
                logo_url: string | null;
                primary_color: string | null;
                secondary_color: string | null;
                support_email: string | null;
                powered_by: boolean;
                inherited: boolean;
            };
            features: {
                white_label: boolean;
                hide_powered_by: boolean;
            };
        };
        BrandResolution: {
            /** @enum {string} */
            kind: "dashboard" | "tracking" | "preference_center" | "status_page";
            org_slug: string;
            product_name: string;
            logo_url: string | null;
            primary_color: string | null;
            secondary_color: string | null;
            support_email: string | null;
            powered_by: boolean;
        };
        WebCampaign: {
            id: string;
            app_id: string;
            name: string;
            /** @enum {string} */
            status: "draft" | "active" | "paused" | "archived";
            priority: number;
            display: {
                /** @enum {string} */
                layout: "popup" | "banner_top" | "banner_bottom" | "slide_in" | "fullscreen";
                /** @enum {string} */
                position?: "left" | "right";
                background_color?: string;
                text_color?: string;
                dismissible?: boolean;
                auto_dismiss_seconds?: number;
                max_width?: number;
                blocks: ({
                    /** @constant */
                    type: "image";
                    url: string;
                    alt?: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "title";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "body";
                    text: {
                        [key: string]: string;
                    };
                } | {
                    /** @constant */
                    type: "button";
                    id: string;
                    text: {
                        [key: string]: string;
                    };
                    action: {
                        /** @constant */
                        type: "dismiss";
                    } | {
                        /** @constant */
                        type: "url";
                        url: string;
                        new_tab?: boolean;
                    } | {
                        /** @constant */
                        type: "push_prompt";
                    } | {
                        /** @constant */
                        type: "outcome";
                        name: string;
                        value?: number;
                    } | {
                        /** @constant */
                        type: "tags";
                        tags: {
                            [key: string]: string;
                        };
                    };
                    background_color?: string;
                    text_color?: string;
                })[];
                form_id?: string | null;
                survey_id?: string | null;
            };
            variants: {
                id: string;
                name: string;
                weight_percent: number;
                display: {
                    /** @enum {string} */
                    layout: "popup" | "banner_top" | "banner_bottom" | "slide_in" | "fullscreen";
                    /** @enum {string} */
                    position?: "left" | "right";
                    background_color?: string;
                    text_color?: string;
                    dismissible?: boolean;
                    auto_dismiss_seconds?: number;
                    max_width?: number;
                    blocks: ({
                        /** @constant */
                        type: "image";
                        url: string;
                        alt?: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "title";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "body";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "button";
                        id: string;
                        text: {
                            [key: string]: string;
                        };
                        action: {
                            /** @constant */
                            type: "dismiss";
                        } | {
                            /** @constant */
                            type: "url";
                            url: string;
                            new_tab?: boolean;
                        } | {
                            /** @constant */
                            type: "push_prompt";
                        } | {
                            /** @constant */
                            type: "outcome";
                            name: string;
                            value?: number;
                        } | {
                            /** @constant */
                            type: "tags";
                            tags: {
                                [key: string]: string;
                            };
                        };
                        background_color?: string;
                        text_color?: string;
                    })[];
                    form_id?: string | null;
                    survey_id?: string | null;
                };
            }[];
            ab_test: {
                winner_variant_id: string | null;
                decided_at: string | null;
                decided_by: string | null;
            };
            trigger: {
                /** @constant */
                kind: "page_load";
                delay_seconds?: number;
            } | {
                /** @constant */
                kind: "time_on_page";
                seconds: number;
            } | {
                /** @constant */
                kind: "scroll_depth";
                percent: number;
            } | {
                /** @constant */
                kind: "exit_intent";
            };
            conditions: {
                url_rules?: {
                    /** @enum {string} */
                    op: "equals" | "contains" | "starts_with" | "not_contains" | "matches";
                    value: string;
                }[];
                utm_rules?: {
                    /** @enum {string} */
                    param: "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content";
                    /** @enum {string} */
                    op: "equals" | "contains" | "exists";
                    value?: string;
                }[];
                visits?: {
                    /** @enum {string} */
                    op: "gte" | "lte" | "eq";
                    value: number;
                };
            };
            targeting: {
                included_segments?: string[];
                excluded_segments?: string[];
                /** @enum {string} */
                visitor?: "all" | "new" | "returning";
                devices?: ("desktop" | "mobile" | "tablet")[];
            };
            frequency: {
                max_per_session?: number;
                max_per_day?: number;
                max_total?: number;
                hide_after_close_days?: number;
                stop_after_conversion?: boolean;
            };
            start_at: string | null;
            end_at: string | null;
            stats: {
                impressions: number;
                clicks: number;
                closes: number;
                conversions: number;
                unique_visitors: number;
                ctr: number;
                conversion_rate: number;
            };
            variant_stats: {
                variant_id: string;
                impressions: number;
                clicks: number;
                conversions: number;
                ctr: number;
                conversion_rate: number;
            }[];
            variant_significance: {
                leader: string | null;
                p_value: number;
                significant: boolean;
            } | null;
            created_at: string;
            updated_at: string;
        };
        WebCampaignPage: {
            data: {
                id: string;
                app_id: string;
                name: string;
                /** @enum {string} */
                status: "draft" | "active" | "paused" | "archived";
                priority: number;
                display: {
                    /** @enum {string} */
                    layout: "popup" | "banner_top" | "banner_bottom" | "slide_in" | "fullscreen";
                    /** @enum {string} */
                    position?: "left" | "right";
                    background_color?: string;
                    text_color?: string;
                    dismissible?: boolean;
                    auto_dismiss_seconds?: number;
                    max_width?: number;
                    blocks: ({
                        /** @constant */
                        type: "image";
                        url: string;
                        alt?: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "title";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "body";
                        text: {
                            [key: string]: string;
                        };
                    } | {
                        /** @constant */
                        type: "button";
                        id: string;
                        text: {
                            [key: string]: string;
                        };
                        action: {
                            /** @constant */
                            type: "dismiss";
                        } | {
                            /** @constant */
                            type: "url";
                            url: string;
                            new_tab?: boolean;
                        } | {
                            /** @constant */
                            type: "push_prompt";
                        } | {
                            /** @constant */
                            type: "outcome";
                            name: string;
                            value?: number;
                        } | {
                            /** @constant */
                            type: "tags";
                            tags: {
                                [key: string]: string;
                            };
                        };
                        background_color?: string;
                        text_color?: string;
                    })[];
                    form_id?: string | null;
                    survey_id?: string | null;
                };
                variants: {
                    id: string;
                    name: string;
                    weight_percent: number;
                    display: {
                        /** @enum {string} */
                        layout: "popup" | "banner_top" | "banner_bottom" | "slide_in" | "fullscreen";
                        /** @enum {string} */
                        position?: "left" | "right";
                        background_color?: string;
                        text_color?: string;
                        dismissible?: boolean;
                        auto_dismiss_seconds?: number;
                        max_width?: number;
                        blocks: ({
                            /** @constant */
                            type: "image";
                            url: string;
                            alt?: {
                                [key: string]: string;
                            };
                        } | {
                            /** @constant */
                            type: "title";
                            text: {
                                [key: string]: string;
                            };
                        } | {
                            /** @constant */
                            type: "body";
                            text: {
                                [key: string]: string;
                            };
                        } | {
                            /** @constant */
                            type: "button";
                            id: string;
                            text: {
                                [key: string]: string;
                            };
                            action: {
                                /** @constant */
                                type: "dismiss";
                            } | {
                                /** @constant */
                                type: "url";
                                url: string;
                                new_tab?: boolean;
                            } | {
                                /** @constant */
                                type: "push_prompt";
                            } | {
                                /** @constant */
                                type: "outcome";
                                name: string;
                                value?: number;
                            } | {
                                /** @constant */
                                type: "tags";
                                tags: {
                                    [key: string]: string;
                                };
                            };
                            background_color?: string;
                            text_color?: string;
                        })[];
                        form_id?: string | null;
                        survey_id?: string | null;
                    };
                }[];
                ab_test: {
                    winner_variant_id: string | null;
                    decided_at: string | null;
                    decided_by: string | null;
                };
                trigger: {
                    /** @constant */
                    kind: "page_load";
                    delay_seconds?: number;
                } | {
                    /** @constant */
                    kind: "time_on_page";
                    seconds: number;
                } | {
                    /** @constant */
                    kind: "scroll_depth";
                    percent: number;
                } | {
                    /** @constant */
                    kind: "exit_intent";
                };
                conditions: {
                    url_rules?: {
                        /** @enum {string} */
                        op: "equals" | "contains" | "starts_with" | "not_contains" | "matches";
                        value: string;
                    }[];
                    utm_rules?: {
                        /** @enum {string} */
                        param: "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content";
                        /** @enum {string} */
                        op: "equals" | "contains" | "exists";
                        value?: string;
                    }[];
                    visits?: {
                        /** @enum {string} */
                        op: "gte" | "lte" | "eq";
                        value: number;
                    };
                };
                targeting: {
                    included_segments?: string[];
                    excluded_segments?: string[];
                    /** @enum {string} */
                    visitor?: "all" | "new" | "returning";
                    devices?: ("desktop" | "mobile" | "tablet")[];
                };
                frequency: {
                    max_per_session?: number;
                    max_per_day?: number;
                    max_total?: number;
                    hide_after_close_days?: number;
                    stop_after_conversion?: boolean;
                };
                start_at: string | null;
                end_at: string | null;
                stats: {
                    impressions: number;
                    clicks: number;
                    closes: number;
                    conversions: number;
                    unique_visitors: number;
                    ctr: number;
                    conversion_rate: number;
                };
                variant_stats: {
                    variant_id: string;
                    impressions: number;
                    clicks: number;
                    conversions: number;
                    ctr: number;
                    conversion_rate: number;
                }[];
                variant_significance: {
                    leader: string | null;
                    p_value: number;
                    significant: boolean;
                } | null;
                created_at: string;
                updated_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        WebCampaignReport: {
            campaign_id: string;
            days: number;
            daily: {
                date: string;
                impressions: number;
                clicks: number;
                closes: number;
                conversions: number;
            }[];
            totals: {
                impressions: number;
                clicks: number;
                closes: number;
                conversions: number;
                unique_visitors: number;
                ctr: number;
                conversion_rate: number;
            };
        };
        SdkWebCampaignList: {
            data: {
                id: string;
                priority: number;
                trigger: {
                    /** @constant */
                    kind: "page_load";
                    delay_seconds?: number;
                } | {
                    /** @constant */
                    kind: "time_on_page";
                    seconds: number;
                } | {
                    /** @constant */
                    kind: "scroll_depth";
                    percent: number;
                } | {
                    /** @constant */
                    kind: "exit_intent";
                };
                conditions: {
                    url_rules?: {
                        /** @enum {string} */
                        op: "equals" | "contains" | "starts_with" | "not_contains" | "matches";
                        value: string;
                    }[];
                    utm_rules?: {
                        /** @enum {string} */
                        param: "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content";
                        /** @enum {string} */
                        op: "equals" | "contains" | "exists";
                        value?: string;
                    }[];
                    visits?: {
                        /** @enum {string} */
                        op: "gte" | "lte" | "eq";
                        value: number;
                    };
                };
                targeting: {
                    /** @enum {string} */
                    visitor: "all" | "new" | "returning";
                    devices: ("desktop" | "mobile" | "tablet")[];
                };
                frequency: {
                    max_per_session?: number;
                    max_per_day?: number;
                    max_total?: number;
                    hide_after_close_days?: number;
                    stop_after_conversion?: boolean;
                };
                display: {
                    /** @enum {string} */
                    layout: "popup" | "banner_top" | "banner_bottom" | "slide_in" | "fullscreen";
                    /** @enum {string} */
                    position: "left" | "right";
                    background_color: string | null;
                    text_color: string | null;
                    dismissible: boolean;
                    auto_dismiss_seconds: number | null;
                    max_width: number | null;
                    blocks: ({
                        /** @constant */
                        type: "image";
                        url: string;
                        alt: string;
                    } | {
                        /** @constant */
                        type: "title";
                        text: string;
                    } | {
                        /** @constant */
                        type: "body";
                        text: string;
                    } | {
                        /** @constant */
                        type: "button";
                        id: string;
                        text: string;
                        action: {
                            /** @constant */
                            type: "dismiss";
                        } | {
                            /** @constant */
                            type: "url";
                            url: string;
                            new_tab?: boolean;
                        } | {
                            /** @constant */
                            type: "push_prompt";
                        } | {
                            /** @constant */
                            type: "outcome";
                            name: string;
                            value?: number;
                        } | {
                            /** @constant */
                            type: "tags";
                            tags: {
                                [key: string]: string;
                            };
                        };
                        background_color: string | null;
                        text_color: string | null;
                    })[];
                    form_id: string | null;
                    survey_id: string | null;
                };
                variants: {
                    id: string;
                    weight_percent: number;
                    display: {
                        /** @enum {string} */
                        layout: "popup" | "banner_top" | "banner_bottom" | "slide_in" | "fullscreen";
                        /** @enum {string} */
                        position: "left" | "right";
                        background_color: string | null;
                        text_color: string | null;
                        dismissible: boolean;
                        auto_dismiss_seconds: number | null;
                        max_width: number | null;
                        blocks: ({
                            /** @constant */
                            type: "image";
                            url: string;
                            alt: string;
                        } | {
                            /** @constant */
                            type: "title";
                            text: string;
                        } | {
                            /** @constant */
                            type: "body";
                            text: string;
                        } | {
                            /** @constant */
                            type: "button";
                            id: string;
                            text: string;
                            action: {
                                /** @constant */
                                type: "dismiss";
                            } | {
                                /** @constant */
                                type: "url";
                                url: string;
                                new_tab?: boolean;
                            } | {
                                /** @constant */
                                type: "push_prompt";
                            } | {
                                /** @constant */
                                type: "outcome";
                                name: string;
                                value?: number;
                            } | {
                                /** @constant */
                                type: "tags";
                                tags: {
                                    [key: string]: string;
                                };
                            };
                            background_color: string | null;
                            text_color: string | null;
                        })[];
                        form_id: string | null;
                        survey_id: string | null;
                    };
                }[];
                end_at: string | null;
            }[];
            forms: {
                [key: string]: {
                    id: string;
                    fields: {
                        id: string;
                        /** @enum {string} */
                        type: "email" | "phone" | "first_name" | "last_name" | "full_name" | "text" | "textarea" | "select" | "radio" | "checkbox" | "consent";
                        label: string;
                        placeholder: string | null;
                        required: boolean;
                        options: {
                            value: string;
                            label: string;
                        }[];
                        max_length: number | null;
                        policy_url: string | null;
                    }[];
                    submit_label: string;
                    success_message: string;
                };
            };
            surveys: {
                [key: string]: {
                    id: string;
                    questions: {
                        id: string;
                        /** @enum {string} */
                        type: "nps" | "csat" | "single_choice" | "multiple_choice" | "text";
                        text: string;
                        required: boolean;
                        options: {
                            value: string;
                            label: string;
                        }[];
                        low_label: string | null;
                        high_label: string | null;
                        placeholder: string | null;
                    }[];
                    submit_label: string;
                    thank_you: string;
                };
            };
            language: string;
        };
        Form: {
            id: string;
            app_id: string;
            name: string;
            /** @enum {string} */
            status: "active" | "archived";
            fields: {
                id: string;
                /** @enum {string} */
                type: "email" | "phone" | "first_name" | "last_name" | "full_name" | "text" | "textarea" | "select" | "radio" | "checkbox" | "consent";
                label: {
                    [key: string]: string;
                };
                placeholder?: {
                    [key: string]: string;
                };
                required?: boolean;
                options?: {
                    value: string;
                    label: {
                        [key: string]: string;
                    };
                }[];
                maps_to?: string;
                max_length?: number;
                policy_url?: string;
            }[];
            settings: {
                submit_label?: {
                    [key: string]: string;
                };
                success_message?: {
                    [key: string]: string;
                };
                redirect_url?: string;
                tags?: {
                    [key: string]: string;
                };
                subscribe?: {
                    email?: boolean;
                    sms?: boolean;
                };
                double_opt_in?: {
                    enabled: boolean;
                    subject?: {
                        [key: string]: string;
                    };
                    body?: {
                        [key: string]: string;
                    };
                };
                event_name?: string;
                captcha?: boolean;
                default_language?: string;
            };
            stats: {
                submissions: number;
                last_submission_at: string | null;
            };
            created_at: string;
            updated_at: string;
        };
        FormPage: {
            data: {
                id: string;
                app_id: string;
                name: string;
                /** @enum {string} */
                status: "active" | "archived";
                fields: {
                    id: string;
                    /** @enum {string} */
                    type: "email" | "phone" | "first_name" | "last_name" | "full_name" | "text" | "textarea" | "select" | "radio" | "checkbox" | "consent";
                    label: {
                        [key: string]: string;
                    };
                    placeholder?: {
                        [key: string]: string;
                    };
                    required?: boolean;
                    options?: {
                        value: string;
                        label: {
                            [key: string]: string;
                        };
                    }[];
                    maps_to?: string;
                    max_length?: number;
                    policy_url?: string;
                }[];
                settings: {
                    submit_label?: {
                        [key: string]: string;
                    };
                    success_message?: {
                        [key: string]: string;
                    };
                    redirect_url?: string;
                    tags?: {
                        [key: string]: string;
                    };
                    subscribe?: {
                        email?: boolean;
                        sms?: boolean;
                    };
                    double_opt_in?: {
                        enabled: boolean;
                        subject?: {
                            [key: string]: string;
                        };
                        body?: {
                            [key: string]: string;
                        };
                    };
                    event_name?: string;
                    captcha?: boolean;
                    default_language?: string;
                };
                stats: {
                    submissions: number;
                    last_submission_at: string | null;
                };
                created_at: string;
                updated_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        FormSubmission: {
            id: string;
            form_id: string;
            user_id: string | null;
            subscription_ids: string[];
            /** @enum {string} */
            source: "web_campaign" | "landing_page" | "sdk" | "api";
            source_id: string | null;
            /** @enum {string} */
            status: "accepted" | "pending_confirmation" | "confirmed";
            data: {
                [key: string]: string | boolean | string[];
            };
            consent: {
                field_id: string;
                given: boolean;
                text: string;
                text_hash: string;
                policy_url: string | null;
                language: string;
                at: string;
            }[];
            page_url: string | null;
            language: string | null;
            confirmed_at: string | null;
            created_at: string;
        };
        FormSubmissionPage: {
            data: {
                id: string;
                form_id: string;
                user_id: string | null;
                subscription_ids: string[];
                /** @enum {string} */
                source: "web_campaign" | "landing_page" | "sdk" | "api";
                source_id: string | null;
                /** @enum {string} */
                status: "accepted" | "pending_confirmation" | "confirmed";
                data: {
                    [key: string]: string | boolean | string[];
                };
                consent: {
                    field_id: string;
                    given: boolean;
                    text: string;
                    text_hash: string;
                    policy_url: string | null;
                    language: string;
                    at: string;
                }[];
                page_url: string | null;
                language: string | null;
                confirmed_at: string | null;
                created_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        FormSubmitResult: {
            /** @constant */
            ok: true;
            /** @enum {string} */
            status: "accepted" | "pending_confirmation";
            submission_id: string | null;
            success_message: string;
            redirect_url: string | null;
        };
        Survey: {
            id: string;
            app_id: string;
            name: string;
            /** @enum {string} */
            status: "draft" | "active" | "closed";
            questions: {
                id: string;
                /** @enum {string} */
                type: "nps" | "csat" | "single_choice" | "multiple_choice" | "text";
                text: {
                    [key: string]: string;
                };
                required?: boolean;
                options?: {
                    value: string;
                    label: {
                        [key: string]: string;
                    };
                }[];
                low_label?: {
                    [key: string]: string;
                };
                high_label?: {
                    [key: string]: string;
                };
                placeholder?: {
                    [key: string]: string;
                };
            }[];
            settings: {
                thank_you?: {
                    [key: string]: string;
                };
                submit_label?: {
                    [key: string]: string;
                };
                write_properties?: boolean;
                allow_multiple?: boolean;
                default_language?: string;
            };
            in_app_message_id: string | null;
            stats: {
                responses: number;
                nps: number | null;
                last_response_at: string | null;
            };
            created_at: string;
            updated_at: string;
        };
        SurveyPage: {
            data: {
                id: string;
                app_id: string;
                name: string;
                /** @enum {string} */
                status: "draft" | "active" | "closed";
                questions: {
                    id: string;
                    /** @enum {string} */
                    type: "nps" | "csat" | "single_choice" | "multiple_choice" | "text";
                    text: {
                        [key: string]: string;
                    };
                    required?: boolean;
                    options?: {
                        value: string;
                        label: {
                            [key: string]: string;
                        };
                    }[];
                    low_label?: {
                        [key: string]: string;
                    };
                    high_label?: {
                        [key: string]: string;
                    };
                    placeholder?: {
                        [key: string]: string;
                    };
                }[];
                settings: {
                    thank_you?: {
                        [key: string]: string;
                    };
                    submit_label?: {
                        [key: string]: string;
                    };
                    write_properties?: boolean;
                    allow_multiple?: boolean;
                    default_language?: string;
                };
                in_app_message_id: string | null;
                stats: {
                    responses: number;
                    nps: number | null;
                    last_response_at: string | null;
                };
                created_at: string;
                updated_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        SurveyReport: {
            survey_id: string;
            days: number;
            responses: number;
            nps: {
                responses: number;
                promoters: number;
                passives: number;
                detractors: number;
                nps: number | null;
            };
            csat: {
                responses: number;
                average: number | null;
                distribution: {
                    [key: string]: number;
                };
            };
            trend: {
                date: string;
                responses: number;
                promoters: number;
                passives: number;
                detractors: number;
                nps: number | null;
            }[];
            channels: {
                [key: string]: number;
            };
            questions: {
                id: string;
                /** @enum {string} */
                type: "nps" | "csat" | "single_choice" | "multiple_choice" | "text";
                counts: {
                    [key: string]: number;
                };
            }[];
        };
        SurveyResponse: {
            id: string;
            survey_id: string;
            user_id: string | null;
            visitor_id: string | null;
            /** @enum {string} */
            channel: "in_app" | "web" | "email" | "api" | "sdk";
            answers: {
                [key: string]: number | string | string[];
            };
            nps_score: number | null;
            nps_category: ("promoter" | "passive" | "detractor") | null;
            csat_score: number | null;
            created_at: string;
        };
        SurveyResponsePage: {
            data: {
                id: string;
                survey_id: string;
                user_id: string | null;
                visitor_id: string | null;
                /** @enum {string} */
                channel: "in_app" | "web" | "email" | "api" | "sdk";
                answers: {
                    [key: string]: number | string | string[];
                };
                nps_score: number | null;
                nps_category: ("promoter" | "passive" | "detractor") | null;
                csat_score: number | null;
                created_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        SurveyResponseResult: {
            /** @constant */
            ok: true;
            response_id: string | null;
            duplicate: boolean;
            thank_you: string;
        };
        LandingPage: {
            id: string;
            app_id: string;
            name: string;
            slug: string;
            /** @enum {string} */
            status: "draft" | "published" | "archived";
            seo: {
                title?: string;
                description?: string;
                og_image?: string;
                canonical_url?: string;
                noindex?: boolean;
            };
            settings: {
                language?: string;
                form_id?: string | null;
                form_section_id?: string | null;
                cookie_consent?: {
                    enabled: boolean;
                    text?: string;
                    accept_label?: string;
                    reject_label?: string;
                    policy_url?: string;
                };
                web_sdk?: boolean;
                favicon_url?: string;
            };
            custom_domain_id: string | null;
            version: number;
            published_version: number | null;
            published_at: string | null;
            has_unpublished_changes: boolean;
            url: string;
            domain_url: string | null;
            stats: {
                submissions: number;
            };
            created_at: string;
            updated_at: string;
            document: {
                /** @constant */
                version: 1;
                settings: {
                    width?: number;
                    background_color?: string;
                    content_background_color?: string;
                    text_color?: string;
                    link_color?: string;
                    /** @enum {string} */
                    font_family?: "system" | "arial" | "georgia" | "verdana" | "trebuchet" | "courier";
                    dark_mode?: {
                        background_color?: string;
                        content_background_color?: string;
                        text_color?: string;
                        link_color?: string;
                    };
                };
                sections: {
                    id: string;
                    /** @constant */
                    type: "section";
                    background_color?: string;
                    background_image?: string;
                    padding?: {
                        top: number;
                        right: number;
                        bottom: number;
                        left: number;
                    };
                    stack_on_mobile?: boolean;
                    columns: {
                        id: string;
                        width_percent?: number;
                        background_color?: string;
                        /** @enum {string} */
                        vertical_align?: "top" | "middle" | "bottom";
                        padding?: {
                            top: number;
                            right: number;
                            bottom: number;
                            left: number;
                        };
                        blocks: ({
                            id: string;
                            /** @constant */
                            type: "text";
                            html: string;
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            font_size?: number;
                            line_height?: number;
                            color?: string;
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "image";
                            src: string;
                            alt: string;
                            decorative?: boolean;
                            href?: string;
                            width?: number;
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "button";
                            text: string;
                            href: string;
                            background_color?: string;
                            text_color?: string;
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            border_radius?: number;
                            font_size?: number;
                            full_width?: boolean;
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "divider";
                            color?: string;
                            thickness?: number;
                            width_percent?: number;
                            padding?: {
                                top: number;
                                right: number;
                                bottom: number;
                                left: number;
                            };
                        } | {
                            id: string;
                            /** @constant */
                            type: "spacer";
                            height: number;
                        } | {
                            id: string;
                            /** @constant */
                            type: "social";
                            /** @enum {string} */
                            align?: "left" | "center" | "right";
                            icon_size?: number;
                            items: {
                                /** @enum {string} */
                                network: "facebook" | "x" | "instagram" | "linkedin" | "youtube" | "pinterest" | "github" | "web";
                                href: string;
                                label?: string;
                            }[];
                        } | {
                            id: string;
                            /** @constant */
                            type: "html";
                            html: string;
                        })[];
                    }[];
                }[];
            };
        };
        LandingPageList: {
            data: {
                id: string;
                app_id: string;
                name: string;
                slug: string;
                /** @enum {string} */
                status: "draft" | "published" | "archived";
                seo: {
                    title?: string;
                    description?: string;
                    og_image?: string;
                    canonical_url?: string;
                    noindex?: boolean;
                };
                settings: {
                    language?: string;
                    form_id?: string | null;
                    form_section_id?: string | null;
                    cookie_consent?: {
                        enabled: boolean;
                        text?: string;
                        accept_label?: string;
                        reject_label?: string;
                        policy_url?: string;
                    };
                    web_sdk?: boolean;
                    favicon_url?: string;
                };
                custom_domain_id: string | null;
                version: number;
                published_version: number | null;
                published_at: string | null;
                has_unpublished_changes: boolean;
                url: string;
                domain_url: string | null;
                stats: {
                    submissions: number;
                };
                created_at: string;
                updated_at: string;
            }[];
            next_cursor: string | null;
            has_more: boolean;
        };
        LandingPreviewResult: {
            html: string;
        };
        LandingPageVersions: {
            data: {
                version: number;
                published_at: string;
                published_by: string | null;
            }[];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: {
        /** @description Kova kapasitesi (izin verilen ani istek sayısı). */
        "X-RateLimit-Limit": number;
        /** @description Kovada kalan istek hakkı. */
        "X-RateLimit-Remaining": number;
        /** @description Kova tamamen dolana (429 ise yeniden denenebilene) kadar saniye. */
        "X-RateLimit-Reset": number;
    };
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    HealthController_root: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    HealthController_statusPage: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    HealthController_healthz: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Süreç çalışıyor. */
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    HealthController_readyz: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PublicApiKeysController_list: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiKeyList"];
                };
            };
        };
    };
    PublicApiKeysController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateAppApiKeyDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreatedApiKey"];
                };
            };
        };
    };
    PublicApiKeysController_revoke: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                keyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicApiKeysController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                keyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateApiKeyDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiKey"];
                };
            };
        };
    };
    PublicApiKeysController_rotate: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                keyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreatedApiKey"];
                };
            };
        };
    };
    PublicIdentityKeysController_list: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["IdentityKeyList"];
                };
            };
        };
    };
    PublicIdentityKeysController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateIdentityKeyDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["IdentityKey"];
                };
            };
        };
    };
    PublicIdentityKeysController_revoke: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                keyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["IdentityKey"];
                };
            };
        };
    };
    SdkController_config: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkConfig"];
                };
            };
        };
    };
    SdkController_register: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkRegisterDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkRegisterResult"];
                };
            };
        };
    };
    SdkController_removeSubscription: {
        parameters: {
            query?: {
                token_hash?: string;
                identity_hash?: string;
            };
            header?: never;
            path: {
                appId: string;
                subscriptionId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    SdkController_patchSubscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                subscriptionId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkSubscriptionPatchDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Subscription"];
                };
            };
        };
    };
    SdkController_login: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                subscriptionId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkLoginDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkUserResult"];
                };
            };
        };
    };
    SdkController_logout: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                subscriptionId: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["SdkLogoutDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkUserResult"];
                };
            };
        };
    };
    SdkController_patchUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                userId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkUserPatchDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkUserResult"];
                };
            };
        };
    };
    SdkController_addIdentity: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                userId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkIdentityDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkIdentityResult"];
                };
            };
        };
    };
    SdkController_removeIdentity: {
        parameters: {
            query?: {
                identity_hash?: string;
            };
            header?: never;
            path: {
                appId: string;
                userId: string;
                label: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkIdentityResult"];
                };
            };
        };
    };
    SdkController_session: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkSessionDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    SdkController_events: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkEventsDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventsAccepted"];
                };
            };
        };
    };
    SdkDeliveriesController_received: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                deliveryId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    SdkDeliveriesController_dismissed: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                deliveryId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    SdkDeliveriesController_opened: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                deliveryId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OpenedDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicLiveActivitiesController_listTypes: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LiveActivityTypeList"];
                };
            };
        };
    };
    PublicLiveActivitiesController_createType: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateLiveActivityTypeDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LiveActivityType"];
                };
            };
        };
    };
    PublicLiveActivitiesController_deleteType: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                activityType: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LiveActivityTokenResult"];
                };
            };
        };
    };
    PublicLiveActivitiesController_updateType: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                activityType: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateLiveActivityTypeDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LiveActivityType"];
                };
            };
        };
    };
    PublicLiveActivitiesController_start: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                activityType: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["StartLiveActivityDto"];
            };
        };
        responses: {
            202: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LiveActivitySendResult"];
                };
            };
        };
    };
    PublicLiveActivitiesController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                activityType: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateLiveActivityDto"];
            };
        };
        responses: {
            202: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LiveActivitySendResult"];
                };
            };
        };
    };
    PublicLiveActivitiesController_end: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                activityType: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EndLiveActivityDto"];
            };
        };
        responses: {
            202: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LiveActivitySendResult"];
                };
            };
        };
    };
    SdkLiveActivitiesController_registerToken: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkLiveActivityTokenDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LiveActivityTokenResult"];
                };
            };
        };
    };
    SdkLiveActivitiesController_deleteToken: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkLiveActivityTokenDeleteDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LiveActivityTokenResult"];
                };
            };
        };
    };
    PublicDynamicContentController_listFeeds: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DataFeedList"];
                };
            };
        };
    };
    PublicDynamicContentController_createFeed: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateDataFeedDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DataFeed"];
                };
            };
        };
    };
    PublicDynamicContentController_getFeed: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                feedId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DataFeed"];
                };
            };
        };
    };
    PublicDynamicContentController_deleteFeed: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                feedId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicDynamicContentController_updateFeed: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                feedId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateDataFeedDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DataFeed"];
                };
            };
        };
    };
    PublicDynamicContentController_testFeed: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                feedId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TestDataFeedDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DataFeedTestResult"];
                };
            };
        };
    };
    PublicDynamicContentController_listTables: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContentTableList"];
                };
            };
        };
    };
    PublicDynamicContentController_createTableUpload: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /**
                     * Format: binary
                     * @description UTF-8 CSV; ilk satır başlık. En fazla 100.000 satır, 20 MB.
                     */
                    file: string;
                    /** @description Liquid tablo adı (küçük harf, rakam, alt çizgi). */
                    name: string;
                    /** @description Satır seçiminde kullanılan anahtar sütunu (değerleri benzersiz). */
                    key_column: string;
                    description?: string;
                };
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContentTable"];
                };
            };
        };
    };
    PublicDynamicContentController_getTable: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                tableId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContentTable"];
                };
            };
        };
    };
    PublicDynamicContentController_deleteTable: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                tableId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicDynamicContentController_updateTable: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                tableId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateContentTableDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContentTable"];
                };
            };
        };
    };
    PublicDynamicContentController_tableRows: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
                q?: string;
            };
            header?: never;
            path: {
                tableId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContentTableRows"];
                };
            };
        };
    };
    PublicDynamicContentController_replaceTableUpload: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                tableId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /**
                     * Format: binary
                     * @description Yeni CSV (tablonun tüm satırları değiştirilir, sürüm artar).
                     */
                    file: string;
                    /** @description İsteğe bağlı yeni anahtar sütunu. */
                    key_column?: string;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContentTable"];
                };
            };
        };
    };
    SdkErrorsIngestController_ingest: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkErrorsDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkErrorsAccepted"];
                };
            };
        };
    };
    PublicWebhooksController_list: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookList"];
                };
            };
        };
    };
    PublicWebhooksController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateWebhookDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookWithSecret"];
                };
            };
        };
    };
    PublicWebhooksController_preview: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["WebhookPreviewDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookPreviewResult"];
                };
            };
        };
    };
    PublicWebhooksController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                webhookId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Webhook"];
                };
            };
        };
    };
    PublicWebhooksController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                webhookId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicWebhooksController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                webhookId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateWebhookDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Webhook"];
                };
            };
        };
    };
    PublicWebhooksController_rotate: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                webhookId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookWithSecret"];
                };
            };
        };
    };
    PublicWebhooksController_test: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                webhookId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookDeliveryDetail"];
                };
            };
        };
    };
    PublicWebhooksController_deliveries: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                status?: "pending" | "success" | "failed" | "dead";
                event_type?: string;
            };
            header?: never;
            path: {
                webhookId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookDeliveryPage"];
                };
            };
        };
    };
    PublicWebhooksController_replay: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                deliveryId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookDeliveryDetail"];
                };
            };
        };
    };
    PublicWarehouseController_tables: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WarehouseTables"];
                };
            };
        };
    };
    PublicWarehouseController_test: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["WarehouseConnectionTest"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WarehouseConnectionResult"];
                };
            };
        };
    };
    PublicWarehouseController_list: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WarehouseExportList"];
                };
            };
        };
    };
    PublicWarehouseController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["WarehouseExportCreate"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WarehouseExport"];
                };
            };
        };
    };
    PublicWarehouseController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                exportId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WarehouseExport"];
                };
            };
        };
    };
    PublicWarehouseController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                exportId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicWarehouseController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                exportId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateWarehouseExportDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WarehouseExport"];
                };
            };
        };
    };
    PublicWarehouseController_testSaved: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                exportId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WarehouseConnectionResult"];
                };
            };
        };
    };
    PublicWarehouseController_run: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                exportId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            202: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WarehouseExportRun"];
                };
            };
        };
    };
    PublicWarehouseController_runs: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
            };
            header?: never;
            path: {
                exportId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WarehouseExportRunPage"];
                };
            };
        };
    };
    PublicApiController_organization: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Org"];
                };
            };
        };
    };
    PublicApiController_members: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MemberList"];
                };
            };
        };
    };
    PublicApiController_auditLogs: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                action?: string;
                actor_id?: string;
                app_id?: string;
                from?: string;
                to?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuditPage"];
                };
            };
        };
    };
    PublicApiController_list: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AppList"];
                };
            };
        };
    };
    PublicApiController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateAppDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["App"];
                };
            };
        };
    };
    PublicApiController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["App"];
                };
            };
        };
    };
    PublicApiController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateAppDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["App"];
                };
            };
        };
    };
    PublicUsersController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                sort?: "last_active_at" | "-last_active_at";
                q?: string;
                tag?: string;
                last_active_after?: string;
                last_active_before?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserList"];
                };
            };
        };
    };
    PublicUsersController_upsert: {
        parameters: {
            query?: never;
            header?: {
                /** @description Aynı anahtarla 24 saat içinde tekrarlanan istek aynı yanıtı döner. */
                "Idempotency-Key"?: string;
            };
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpsertUserDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDetail"];
                };
            };
        };
    };
    PublicUsersController_search: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description Filtre AST: all/any/none grupları ve { field, op, value } koşulları (docs/plan/05 §5.7). */
                    definition: {
                        all?: Record<string, never>[];
                        any?: Record<string, never>[];
                        none?: Record<string, never>[];
                    };
                    /** @default 50 */
                    limit?: number;
                    cursor?: string;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserList"];
                };
            };
        };
    };
    PublicUsersController_getByAlias: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDetail"];
                };
            };
        };
    };
    PublicUsersController_deleteByAlias: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicUsersController_patchByAlias: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchUserDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDetail"];
                };
            };
        };
    };
    PublicUsersController_getIdentity: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserIdentity"];
                };
            };
        };
    };
    PublicUsersController_addAlias: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AddAliasDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDetail"];
                };
            };
        };
    };
    PublicUsersController_exportUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserExport"];
                };
            };
        };
    };
    PublicUsersController_removeAlias: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                aliasLabel: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDetail"];
                };
            };
        };
    };
    PublicUsersController_addSubscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AddSubscriptionDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Subscription"];
                };
            };
        };
    };
    PublicUsersController_getSubscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                subscriptionId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Subscription"];
                };
            };
        };
    };
    PublicUsersController_deleteSubscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                subscriptionId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicUsersController_patchSubscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                subscriptionId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchSubscriptionDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Subscription"];
                };
            };
        };
    };
    PublicUsersController_getSubscriptionIdentity: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                subscriptionId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserIdentity"];
                };
            };
        };
    };
    PublicUsersController_patchSubscriptionByToken: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                tokenType: string;
                token: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchSubscriptionDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Subscription"];
                };
            };
        };
    };
    PublicUsersController_setOwner: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                subscriptionId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SetOwnerDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Subscription"];
                };
            };
        };
    };
    PublicUsersController_events: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ApiEventsDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventsAccepted"];
                };
            };
        };
    };
    PublicChannelsController_list: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChannelList"];
                };
            };
        };
    };
    PublicChannelsController_upsert: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                channel: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @constant */
                    provider: "apns";
                    key_id?: string;
                    team_id?: string;
                    bundle_id?: string;
                    /** @enum {string} */
                    environment?: "sandbox" | "production";
                    p8?: string;
                    p12?: string;
                    p12_password?: string;
                } | {
                    /** @constant */
                    provider: "fcm";
                    service_account: {
                        /** @constant */
                        type?: "service_account";
                        project_id: string;
                        /** Format: email */
                        client_email: string;
                        private_key: string;
                        /** Format: uri */
                        token_uri?: string;
                    } | string;
                    confirm_project_change?: boolean;
                } | {
                    /** @constant */
                    provider: "hms";
                    app_id: string;
                    client_secret?: string;
                    high_priority?: boolean;
                } | {
                    /** @constant */
                    provider: "webpush";
                    subject: string;
                    /** Format: uri */
                    site_url?: string;
                    vapid_public_key?: string;
                    vapid_private_key?: string;
                } | {
                    /** @constant */
                    provider: "smtp";
                    host: string;
                    port: number;
                    secure: boolean;
                    username?: string;
                    password?: string;
                    /** Format: email */
                    from_address: string;
                    from_name?: string;
                    /** Format: email */
                    reply_to?: string;
                    postal_address?: string;
                    dkim_selector?: string;
                } | {
                    /** @constant */
                    provider: "ses";
                    region: string;
                    access_key_id: string;
                    secret_access_key?: string;
                    configuration_set?: string;
                    /** Format: email */
                    from_address: string;
                    from_name?: string;
                    /** Format: email */
                    reply_to?: string;
                    postal_address?: string;
                    dkim_selector?: string;
                } | {
                    /** @constant */
                    provider: "resend";
                    api_key?: string;
                    webhook_secret?: string;
                    /** Format: email */
                    from_address: string;
                    from_name?: string;
                    /** Format: email */
                    reply_to?: string;
                    postal_address?: string;
                    dkim_selector?: string;
                } | {
                    /** @constant */
                    provider: "twilio";
                    account_sid: string;
                    auth_token?: string;
                    from_number?: string;
                    messaging_service_sid?: string;
                    content_sid?: string;
                    sms_fallback?: boolean;
                } | {
                    /** @constant */
                    provider: "netgsm";
                    usercode: string;
                    password?: string;
                    msgheader: string;
                    /** @enum {string} */
                    iys_filter?: "0" | "11" | "12";
                } | {
                    /** @constant */
                    provider: "meta_whatsapp";
                    waba_id: string;
                    phone_number_id: string;
                    graph_api_version?: string;
                    access_token?: string;
                    app_secret?: string;
                    verify_token?: string;
                } | {
                    /** @constant */
                    provider: "google_rbm";
                    agent_id: string;
                    service_account?: {
                        /** @constant */
                        type?: "service_account";
                        project_id: string;
                        /** Format: email */
                        client_email: string;
                        private_key: string;
                        /** Format: uri */
                        token_uri?: string;
                    } | string;
                    client_token?: string;
                    sms_fallback?: boolean;
                } | {
                    /** @constant */
                    provider: "mock";
                    app_secret?: string;
                    sms_fallback?: boolean;
                    /** Format: email */
                    from_address?: string;
                    from_name?: string;
                    dkim_selector?: string;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChannelConfig"];
                };
            };
        };
    };
    PublicChannelsController_validate: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                channel: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChannelValidation"];
                };
            };
        };
    };
    PublicNotificationsController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                app_id?: string;
                source?: "campaign" | "api" | "journey" | "test";
                kind?: "campaign" | "api" | "journey" | "test";
                status?: "queued" | "processing" | "completed" | "cancelled" | "failed";
                sort?: "created_at" | "-created_at";
                label?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageList"];
                };
            };
        };
    };
    PublicNotificationsController_create: {
        parameters: {
            query?: never;
            header?: {
                /** @description Aynı anahtarla 24 saat içinde tekrarlanan istek aynı mesajı döner (gövdedeki idempotency_key ile eşdeğer). */
                "Idempotency-Key"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateNotificationDto"];
            };
        };
        responses: {
            202: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateNotificationResult"];
                };
            };
        };
    };
    PublicNotificationsController_estimate: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EstimateAudienceDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EstimateAudienceResult"];
                };
            };
        };
    };
    PublicNotificationsController_get: {
        parameters: {
            query?: {
                app_id?: string;
            };
            header?: never;
            path: {
                messageId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Message"];
                };
            };
        };
    };
    PublicNotificationsController_cancel: {
        parameters: {
            query?: {
                app_id?: string;
            };
            header?: never;
            path: {
                messageId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Message"];
                };
            };
        };
    };
    PublicNotificationsController_deliveries: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                app_id?: string;
                status?: "pending" | "sent" | "delivered" | "failed" | "bounced" | "suppressed" | "expired" | "cancelled";
            };
            header?: never;
            path: {
                messageId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DeliveryList"];
                };
            };
        };
    };
    PublicAnalyticsController_overview: {
        parameters: {
            query?: {
                range?: "7d" | "30d";
                from?: string;
                to?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OverviewStats"];
                };
            };
        };
    };
    PublicAnalyticsController_messagesReport: {
        parameters: {
            query?: {
                from?: string;
                to?: string;
                compare?: "true" | "false";
                format?: "json" | "csv";
                group_by?: "day" | "channel" | "campaign";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessagesReport"];
                };
            };
        };
    };
    PublicAnalyticsController_subscriptionsReport: {
        parameters: {
            query?: {
                from?: string;
                to?: string;
                compare?: "true" | "false";
                format?: "json" | "csv";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SubscriptionsReport"];
                };
            };
        };
    };
    PublicAnalyticsController_eventsReport: {
        parameters: {
            query?: {
                from?: string;
                to?: string;
                compare?: "true" | "false";
                format?: "json" | "csv";
                name?: string;
                group_by?: "day" | "name";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventsReport"];
                };
            };
        };
    };
    PublicAnalyticsController_conversionsReport: {
        parameters: {
            query?: {
                from?: string;
                to?: string;
                compare?: "true" | "false";
                format?: "json" | "csv";
                campaign_id?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConversionsReport"];
                };
            };
        };
    };
    PublicAnalyticsController_funnelReport: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FunnelBodyDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FunnelReport"];
                };
            };
        };
    };
    PublicAnalyticsController_providersReport: {
        parameters: {
            query?: {
                from?: string;
                to?: string;
                compare?: "true" | "false";
                format?: "json" | "csv";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProvidersReport"];
                };
            };
        };
    };
    PublicAnalyticsController_retentionReport: {
        parameters: {
            query?: {
                weeks?: number;
                format?: "json" | "csv";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RetentionReport"];
                };
            };
        };
    };
    PublicAnalyticsController_engagementReport: {
        parameters: {
            query?: {
                from?: string;
                to?: string;
                compare?: "true" | "false";
                format?: "json" | "csv";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EngagementReport"];
                };
            };
        };
    };
    PublicEventsController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventDefinitionList"];
                };
            };
        };
    };
    PublicEventsController_detail: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                name: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventDefinitionDetail"];
                };
            };
        };
    };
    PublicEventsController_patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                name: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PatchEventDefinitionDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventDefinition"];
                };
            };
        };
    };
    PublicDataTransferController_listExports: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ExportList"];
                };
            };
        };
    };
    PublicDataTransferController_createExport: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateExportDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Export"];
                };
            };
        };
    };
    PublicDataTransferController_getExport: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                exportId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Export"];
                };
            };
        };
    };
    PublicDataTransferController_listImports: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ImportList"];
                };
            };
        };
    };
    PublicDataTransferController_createImport: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /** @enum {string} */
                    type: "onesignal_players" | "csv_users";
                    /**
                     * Format: binary
                     * @description CSV dosyası (UTF-8, en fazla 50 MB)
                     */
                    file: string;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Import"];
                };
            };
        };
    };
    PublicDataTransferController_getImport: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                importId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Import"];
                };
            };
        };
    };
    PublicNotificationHistoryController_history: {
        parameters: {
            query?: {
                app_id?: string;
            };
            header?: never;
            path: {
                messageId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Export"];
                };
            };
        };
    };
    PublicNotificationHistoryController_exportEvents: {
        parameters: {
            query?: {
                app_id?: string;
            };
            header?: never;
            path: {
                messageId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            202: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Export"];
                };
            };
        };
    };
    PublicSegmentsController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                q?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SegmentPage"];
                };
            };
        };
    };
    PublicSegmentsController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name: string;
                    description?: string | null;
                    /** @description Filtre AST: all/any/none grupları ve { field, op, value } koşulları (docs/plan/05 §5.7). */
                    definition: {
                        all?: Record<string, never>[];
                        any?: Record<string, never>[];
                        none?: Record<string, never>[];
                    };
                    is_dynamic?: boolean;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Segment"];
                };
            };
        };
    };
    PublicSegmentsController_preview: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description Filtre AST: all/any/none grupları ve { field, op, value } koşulları (docs/plan/05 §5.7). */
                    definition: {
                        all?: Record<string, never>[];
                        any?: Record<string, never>[];
                        none?: Record<string, never>[];
                    };
                    limit?: number;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SegmentPreview"];
                };
            };
        };
    };
    PublicSegmentsController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                segmentId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Segment"];
                };
            };
        };
    };
    PublicSegmentsController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                segmentId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicSegmentsController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                segmentId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    description?: string | null;
                    /** @description Filtre AST: all/any/none grupları ve { field, op, value } koşulları (docs/plan/05 §5.7). */
                    definition?: {
                        all?: Record<string, never>[];
                        any?: Record<string, never>[];
                        none?: Record<string, never>[];
                    };
                    is_dynamic?: boolean;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Segment"];
                };
            };
        };
    };
    PublicSegmentsController_usedBy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                segmentId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SegmentCampaigns"];
                };
            };
        };
    };
    PublicSegmentsController_estimate: {
        parameters: {
            query?: {
                /** @description true: önbelleği atla, tam sayım */
                force?: "true" | "false";
            };
            header?: never;
            path: {
                segmentId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SegmentEstimate"];
                };
            };
        };
    };
    PublicTemplatesController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                q?: string;
                channel?: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TemplatePage"];
                };
            };
        };
    };
    PublicTemplatesController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateTemplateDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Template"];
                };
            };
        };
    };
    PublicTemplatesController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                templateId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Template"];
                };
            };
        };
    };
    PublicTemplatesController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                templateId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicTemplatesController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                templateId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateTemplateDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Template"];
                };
            };
        };
    };
    PublicTemplatesController_stats: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                templateId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TemplateStats"];
                };
            };
        };
    };
    PublicTemplatesController_copyToApp: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                templateId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CopyTemplateDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Template"];
                };
            };
        };
    };
    PublicTemplatesController_versions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                templateId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TemplateVersionList"];
                };
            };
        };
    };
    PublicTemplatesController_render: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                templateId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RenderTemplateDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RenderPreview"];
                };
            };
        };
    };
    PublicCampaignsController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                q?: string;
                status?: "draft" | "scheduled" | "running" | "paused" | "completed" | "cancelled" | "failed";
                type?: "one_time" | "scheduled" | "recurring" | "automated" | "transactional";
                channel?: "ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs";
                label?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CampaignPage"];
                };
            };
        };
    };
    PublicCampaignsController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    /** @enum {string} */
                    type?: "one_time" | "scheduled" | "recurring";
                    audience?: {
                        all?: boolean;
                        segments?: string[];
                        exclude_segments?: string[];
                        /** @description Filtre AST: all/any/none grupları ve { field, op, value } koşulları (docs/plan/05 §5.7). */
                        filters?: {
                            all?: Record<string, never>[];
                            any?: Record<string, never>[];
                            none?: Record<string, never>[];
                        };
                        channels?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
                        test_devices_only?: boolean;
                    };
                    /** @description messages.content ile aynı şema (headings, contents, url, buttons…) */
                    content?: Record<string, never>;
                    labels?: string[];
                    /** @description Tercih kategorisi anahtarı; kapalı kullanıcılar bastırılır */
                    category?: string | null;
                    ab_test?: {
                        enabled?: boolean;
                        test_percentage?: number;
                        winner?: {
                            /** @enum {string} */
                            mode?: "manual" | "auto";
                            /** @enum {string} */
                            metric?: "open_rate" | "click_rate" | "conversion_rate";
                            evaluate_after_minutes?: number;
                        };
                    };
                    /** @description A/B varyantları (ağırlıklar toplamı 100; en fazla bir is_control) */
                    variants?: {
                        id?: string;
                        name: string;
                        weight_percent: number;
                        content?: Record<string, never> | null;
                        is_control?: boolean;
                    }[];
                    template_id?: string;
                    template_version?: number;
                    delivery?: {
                        /** @enum {string} */
                        timezone_mode?: "immediate" | "per_user_timezone" | "optimized";
                        delivery_time_of_day?: string;
                        throttle_per_minute?: number;
                        ttl?: number;
                        /** @enum {integer} */
                        priority?: 5 | 10;
                        collapse_id?: string;
                        frequency_cap_exempt?: boolean;
                        quiet_hours_exempt?: boolean;
                        one_per_user?: boolean;
                    };
                    recurrence?: {
                        cron?: string;
                        /** Format: date-time */
                        until?: string | null;
                        timezone?: string;
                    } | null;
                    /** Format: date-time */
                    send_at?: string | null;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicCampaignsController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    /** @enum {string} */
                    type?: "one_time" | "scheduled" | "recurring";
                    audience?: {
                        all?: boolean;
                        segments?: string[];
                        exclude_segments?: string[];
                        /** @description Filtre AST: all/any/none grupları ve { field, op, value } koşulları (docs/plan/05 §5.7). */
                        filters?: {
                            all?: Record<string, never>[];
                            any?: Record<string, never>[];
                            none?: Record<string, never>[];
                        };
                        channels?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
                        test_devices_only?: boolean;
                    };
                    /** @description messages.content ile aynı şema (headings, contents, url, buttons…) */
                    content?: Record<string, never>;
                    labels?: string[];
                    /** @description Tercih kategorisi anahtarı; kapalı kullanıcılar bastırılır */
                    category?: string | null;
                    ab_test?: {
                        enabled?: boolean;
                        test_percentage?: number;
                        winner?: {
                            /** @enum {string} */
                            mode?: "manual" | "auto";
                            /** @enum {string} */
                            metric?: "open_rate" | "click_rate" | "conversion_rate";
                            evaluate_after_minutes?: number;
                        };
                    };
                    /** @description A/B varyantları (ağırlıklar toplamı 100; en fazla bir is_control) */
                    variants?: {
                        id?: string;
                        name: string;
                        weight_percent: number;
                        content?: Record<string, never> | null;
                        is_control?: boolean;
                    }[];
                    template_id?: string;
                    template_version?: number;
                    delivery?: {
                        /** @enum {string} */
                        timezone_mode?: "immediate" | "per_user_timezone" | "optimized";
                        delivery_time_of_day?: string;
                        throttle_per_minute?: number;
                        ttl?: number;
                        /** @enum {integer} */
                        priority?: 5 | 10;
                        collapse_id?: string;
                        frequency_cap_exempt?: boolean;
                        quiet_hours_exempt?: boolean;
                        one_per_user?: boolean;
                    };
                    recurrence?: {
                        cron?: string;
                        /** Format: date-time */
                        until?: string | null;
                        timezone?: string;
                    } | null;
                    /** Format: date-time */
                    send_at?: string | null;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_schedule: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ScheduleCampaignDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_send: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_pause: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_resume: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_cancel: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_duplicate: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_approve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_stats: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CampaignStats"];
                };
            };
        };
    };
    PublicCampaignsController_variantStats: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CampaignVariantStats"];
                };
            };
        };
    };
    PublicCampaignsController_selectWinner: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SelectWinnerDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_deliveries: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                app_id?: string;
                status?: "pending" | "sent" | "delivered" | "failed" | "bounced" | "suppressed" | "expired" | "cancelled";
            };
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DeliveryList"];
                };
            };
        };
    };
    PublicCampaignsController_resendFailed: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    PublicCampaignsController_messages: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageList"];
                };
            };
        };
    };
    PublicConversationsController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                channel?: "sms" | "whatsapp" | "rcs" | "email" | "chat";
                status?: "open" | "pending" | "resolved" | "closed";
                unread?: "true" | "false";
                q?: string;
                assignee?: string;
                team_id?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConversationPage"];
                };
            };
        };
    };
    PublicConversationsController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conversationId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Conversation"];
                };
            };
        };
    };
    PublicConversationsController_setStatus: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conversationId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ConversationUpdateDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Conversation"];
                };
            };
        };
    };
    PublicConversationsController_messages: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                after_seq?: number;
            };
            header?: never;
            path: {
                conversationId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConversationMessagePage"];
                };
            };
        };
    };
    PublicConversationsController_reply: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conversationId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ConversationReplyDto"];
            };
        };
        responses: {
            202: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConversationReplyResult"];
                };
            };
        };
    };
    PublicConversationsController_read: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conversationId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Conversation"];
                };
            };
        };
    };
    PublicConversationsController_assign: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conversationId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ConversationAssignDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Conversation"];
                };
            };
        };
    };
    PublicConversationsController_tags: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conversationId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ConversationTagsDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConversationTagsResult"];
                };
            };
        };
    };
    PublicConversationsController_activity: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                conversationId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConversationActivity"];
                };
            };
        };
    };
    PublicConversationsController_keywords: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SmsKeywordList"];
                };
            };
        };
    };
    PublicConversationsController_createKeyword: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateKeywordDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SmsKeyword"];
                };
            };
        };
    };
    PublicConversationsController_deleteKeyword: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                keywordId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicConversationsController_updateKeyword: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                keywordId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateKeywordDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SmsKeyword"];
                };
            };
        };
    };
    PublicConversationsController_templates: {
        parameters: {
            query?: {
                status?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WhatsAppTemplateList"];
                };
            };
        };
    };
    PublicConversationsController_sync: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WhatsAppTemplateSync"];
                };
            };
        };
    };
    SdkChatController_config: {
        parameters: {
            query?: {
                language?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkChatConfig"];
                };
            };
        };
    };
    SdkChatController_identify: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkChatIdentifyDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkChatIdentifyResult"];
                };
            };
        };
    };
    SdkChatController_conversation: {
        parameters: {
            query: {
                visitor_id: string;
                token: string;
                after_seq?: number;
                before_seq?: number;
                limit?: number;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkChatConversation"];
                };
            };
        };
    };
    SdkChatController_messages: {
        parameters: {
            query: {
                visitor_id: string;
                token: string;
                after_seq?: number;
                before_seq?: number;
                limit?: number;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkChatMessagePage"];
                };
            };
        };
    };
    SdkChatController_send: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkChatSendDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkChatSendResult"];
                };
            };
        };
    };
    SdkChatController_upload: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkChatSendResult"];
                };
            };
        };
    };
    SdkChatController_attachment: {
        parameters: {
            query: {
                visitor_id: string;
                token: string;
                after_seq?: number;
                before_seq?: number;
                limit?: number;
            };
            header?: never;
            path: {
                appId: string;
                attachmentId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    SdkChatController_typing: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkChatTypingDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    SdkChatController_ack: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkChatAckDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkChatConversation"];
                };
            };
        };
    };
    SdkChatController_offline: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkChatOfflineDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkChatSendResult"];
                };
            };
        };
    };
    SdkChatController_stream: {
        parameters: {
            query: {
                visitor_id: string;
                token: string;
                after_seq?: number;
                before_seq?: number;
                limit?: number;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PublicInboxController_canned: {
        parameters: {
            query?: {
                q?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CannedResponseList"];
                };
            };
        };
    };
    PublicInboxController_createCanned: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CannedInputDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CannedResponse"];
                };
            };
        };
    };
    PublicInboxController_deleteCanned: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                cannedId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicInboxController_updateCanned: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                cannedId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CannedUpdateDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CannedResponse"];
                };
            };
        };
    };
    PublicInboxController_teams: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxTeamList"];
                };
            };
        };
    };
    PublicInboxController_agents: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxAgentList"];
                };
            };
        };
    };
    PublicInboxController_settings: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxSettings"];
                };
            };
        };
    };
    PublicInboxController_updateSettings: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InboxSettingsUpdateDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxSettings"];
                };
            };
        };
    };
    PublicInboxController_metrics: {
        parameters: {
            query?: {
                from?: string;
                to?: string;
                channel?: "sms" | "whatsapp" | "rcs" | "email" | "chat";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxMetrics"];
                };
            };
        };
    };
    PublicDeliverabilityController_settings: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmailDeliverabilitySettings"];
                };
            };
        };
    };
    PublicDeliverabilityController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DeliverabilitySettingsDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmailDeliverabilitySettings"];
                };
            };
        };
    };
    PublicDeliverabilityController_verify: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VerifyAddressDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmailAddressCheck"];
                };
            };
        };
    };
    PublicDeliverabilityController_plans: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmailWarmupPlanList"];
                };
            };
        };
    };
    PublicDeliverabilityController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateWarmupPlanDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmailWarmupPlan"];
                };
            };
        };
    };
    PublicDeliverabilityController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                planId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmailWarmupPlan"];
                };
            };
        };
    };
    PublicDeliverabilityController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                planId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicDeliverabilityController_updatePlan: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                planId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateWarmupPlanDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmailWarmupPlan"];
                };
            };
        };
    };
    PublicDeliverabilityController_usage: {
        parameters: {
            query?: {
                days?: number;
            };
            header?: never;
            path: {
                planId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmailWarmupUsage"];
                };
            };
        };
    };
    PublicSuppressionsController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                channel?: "email" | "sms" | "whatsapp" | "rcs";
                reason?: "bounce" | "complaint" | "manual" | "unsubscribe_link" | "stop";
                value?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SuppressionPage"];
                };
            };
        };
    };
    PublicSuppressionsController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateSuppressionDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Suppression"];
                };
            };
        };
    };
    PublicSuppressionsController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                suppressionId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    SdkEngagementController_inAppList: {
        parameters: {
            query: {
                subscription_id: string;
                token_hash?: string;
                supports?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkInAppList"];
                };
            };
        };
    };
    SdkEngagementController_inAppEvent: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                messageId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkInAppEventDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    SdkEngagementController_inboxList: {
        parameters: {
            query: {
                limit?: number;
                cursor?: string;
                subscription_id: string;
                identity_hash?: string;
                token_hash?: string;
            };
            header?: never;
            path: {
                appId: string;
                userId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxPage"];
                };
            };
        };
    };
    SdkEngagementController_inboxReadAll: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                userId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkInboxActionDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxReadAllResult"];
                };
            };
        };
    };
    SdkEngagementController_inboxRead: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                userId: string;
                itemId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkInboxActionDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxItem"];
                };
            };
        };
    };
    SdkEngagementController_inboxArchive: {
        parameters: {
            query: {
                subscription_id: string;
                identity_hash?: string;
                token_hash?: string;
            };
            header?: never;
            path: {
                appId: string;
                userId: string;
                itemId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicInAppController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                status?: "draft" | "active" | "paused" | "archived";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InAppMessagePage"];
                };
            };
        };
    };
    PublicInAppController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateInAppDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InAppMessage"];
                };
            };
        };
    };
    PublicInAppController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                messageId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InAppMessage"];
                };
            };
        };
    };
    PublicInAppController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                messageId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicInAppController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                messageId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateInAppDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InAppMessage"];
                };
            };
        };
    };
    PublicInAppController_status: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                messageId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InAppStatusDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InAppMessage"];
                };
            };
        };
    };
    PublicInAppController_winner: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                messageId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InAppWinnerDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InAppMessage"];
                };
            };
        };
    };
    PublicInboxController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                include_archived?: "true" | "false";
            };
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxPage"];
                };
            };
        };
    };
    PublicInboxController_readAll: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxReadAllResult"];
                };
            };
        };
    };
    PublicInboxController_read: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                itemId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InboxItem"];
                };
            };
        };
    };
    PublicInboxController_archive: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                itemId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicPreferencesController_list: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageCategoryList"];
                };
            };
        };
    };
    PublicPreferencesController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCategoryDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageCategory"];
                };
            };
        };
    };
    PublicPreferencesController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                categoryId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicPreferencesController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                categoryId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateCategoryDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageCategory"];
                };
            };
        };
    };
    PublicPreferencesController_userPreferences: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserPreferences"];
                };
            };
        };
    };
    PublicPreferencesController_setUserPreferences: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SetPreferencesDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserPreferences"];
                };
            };
        };
    };
    SdkPreferencesController_get: {
        parameters: {
            query: {
                subscription_id: string;
                token_hash?: string;
                identity_hash?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkPreferences"];
                };
            };
        };
    };
    SdkPreferencesController_set: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkSetPreferencesDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkPreferences"];
                };
            };
        };
    };
    PublicBillingController_usage: {
        parameters: {
            query?: {
                days?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UsageReport"];
                };
            };
        };
    };
    PublicJourneysController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                status?: "draft" | "active" | "paused" | "archived";
                q?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyPage"];
                };
            };
        };
    };
    PublicJourneysController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name: string;
                    description?: string;
                    /** @description React Flow uyumlu journey grafı: { nodes: [{ id, type, position, data }], edges: [{ id, source, target, sourceHandle }] } (docs/journeys.md) */
                    graph?: {
                        nodes: {
                            [key: string]: unknown;
                        }[];
                        edges: {
                            [key: string]: unknown;
                        }[];
                    };
                    /** @description Yeniden giriş, yalnızca yeni girenler, çıkış kuralları, çıkış tag'leri, hedefler, takvim (docs/journeys.md) */
                    settings?: {
                        [key: string]: unknown;
                    };
                };
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyDetail"];
                };
            };
        };
    };
    PublicJourneysController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyDetail"];
                };
            };
        };
    };
    PublicJourneysController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    PublicJourneysController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateJourneyDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyDetail"];
                };
            };
        };
    };
    PublicJourneysController_saveDraft: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description React Flow uyumlu journey grafı: { nodes: [{ id, type, position, data }], edges: [{ id, source, target, sourceHandle }] } (docs/journeys.md) */
                    graph: {
                        nodes: {
                            [key: string]: unknown;
                        }[];
                        edges: {
                            [key: string]: unknown;
                        }[];
                    };
                    /** @description Yeniden giriş, yalnızca yeni girenler, çıkış kuralları, çıkış tag'leri, hedefler, takvim (docs/journeys.md) */
                    settings?: {
                        [key: string]: unknown;
                    };
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyDetail"];
                };
            };
        };
    };
    PublicJourneysController_updateNode: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                nodeId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateNodeDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyDetail"];
                };
            };
        };
    };
    PublicJourneysController_versions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyVersionList"];
                };
            };
        };
    };
    PublicJourneysController_publish: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyPublishResult"];
                };
            };
        };
    };
    PublicJourneysController_pause: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyDetail"];
                };
            };
        };
    };
    PublicJourneysController_resume: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyDetail"];
                };
            };
        };
    };
    PublicJourneysController_archive: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyDetail"];
                };
            };
        };
    };
    PublicJourneysController_duplicate: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyDetail"];
                };
            };
        };
    };
    PublicJourneysController_stats: {
        parameters: {
            query?: {
                version?: number;
                all_versions?: "true" | "false";
            };
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyStats"];
                };
            };
        };
    };
    PublicJourneysController_runs: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                status?: "active" | "waiting" | "completed" | "exited" | "failed";
                user_id?: string;
                version?: number;
            };
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyRunPage"];
                };
            };
        };
    };
    PublicJourneysController_trigger: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TriggerRunDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyTriggerResult"];
                };
            };
        };
    };
    PublicJourneysController_run: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                runId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyRunDetail"];
                };
            };
        };
    };
    PublicJourneysController_exitRun: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                journeyId: string;
                runId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JourneyRunDetail"];
                };
            };
        };
    };
    PublicUserJourneysController_list: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                label: string;
                value: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserJourneyRuns"];
                };
            };
        };
    };
    PublicZapierController_me: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ZapierMe"];
                };
            };
        };
    };
    PublicZapierController_subscribe: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ZapierSubscribeDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ZapierHook"];
                };
            };
        };
    };
    PublicZapierController_unsubscribe: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                hookId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["IntegrationOk"];
                };
            };
        };
    };
    PublicZapierController_samples: {
        parameters: {
            query: {
                event: "subscription.created" | "subscription.unsubscribed" | "event.received" | "delivery.delivered" | "delivery.opened" | "delivery.clicked" | "user.created" | "user.updated" | "conversion.created" | "campaign.completed";
                event_name?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ZapierSamples"];
                };
            };
        };
    };
    PublicAdsController_listAccounts: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdAccountList"];
                };
            };
        };
    };
    PublicAdsController_listAudiences: {
        parameters: {
            query?: {
                ad_account_id?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdAudienceList"];
                };
            };
        };
    };
    PublicAdsController_createAudience: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateAdAudienceDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdAudience"];
                };
            };
        };
    };
    PublicAdsController_getAudience: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                audienceId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdAudience"];
                };
            };
        };
    };
    PublicAdsController_removeAudience: {
        parameters: {
            query?: {
                delete_on_platform?: "true" | "false";
            };
            header?: never;
            path: {
                audienceId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdOk"];
                };
            };
        };
    };
    PublicAdsController_updateAudience: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                audienceId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateAdAudienceDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdAudience"];
                };
            };
        };
    };
    PublicAdsController_sync: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                audienceId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SyncAdAudienceDto"];
            };
        };
        responses: {
            202: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdAudienceSyncQueued"];
                };
            };
        };
    };
    PublicAdsController_syncs: {
        parameters: {
            query?: {
                limit?: number;
            };
            header?: never;
            path: {
                audienceId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdAudienceSyncList"];
                };
            };
        };
    };
    PublicAdsController_lookalike: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                audienceId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateLookalikeDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdAudience"];
                };
            };
        };
    };
    PublicAdsReportingController_list: {
        parameters: {
            query?: {
                ad_account_id?: string;
                level?: "campaign" | "ad_set" | "ad";
                parent_id?: string;
                status?: "active" | "paused" | "pending" | "rejected" | "archived" | "deleted" | "unknown";
                q?: string;
                from?: string;
                to?: string;
                limit?: number;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdEntityList"];
                };
            };
        };
    };
    PublicAdsReportingController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdEntity"];
                };
            };
        };
    };
    PublicAdsReportingController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                entityId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateAdCampaignDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdEntity"];
                };
            };
        };
    };
    PublicAdsReportingController_refresh: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                accountId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            202: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdRefreshQueued"];
                };
            };
        };
    };
    PublicAdsReportingController_spend: {
        parameters: {
            query: {
                from: string;
                to: string;
                currency?: string;
                group_by?: "day" | "platform" | "account" | "campaign" | "ad_set";
                ad_account_id?: string;
                campaign_id?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdSpendReport"];
                };
            };
        };
    };
    PublicAdsReportingController_attribution: {
        parameters: {
            query: {
                from: string;
                to: string;
                model?: "last_click" | "first_click" | "linear" | "time_decay";
                window_days?: number;
                half_life_days?: number;
                currency?: string;
                group_by?: "channel" | "campaign" | "ad_set";
                conversion_events?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdAttributionReport"];
                };
            };
        };
    };
    PublicAdsReportingController_ltv: {
        parameters: {
            query?: {
                months?: number;
                cohorts?: number;
                currency?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdLtvReport"];
                };
            };
        };
    };
    PublicAdsReportingController_capiConfigs: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdCapiConfigList"];
                };
            };
        };
    };
    PublicAdsReportingController_capiDeliveries: {
        parameters: {
            query?: {
                config_id?: string;
                status?: "pending" | "sent" | "failed" | "skipped";
                limit?: number;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdCapiDeliveryList"];
                };
            };
        };
    };
    PublicAdsReportingController_rules: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdBudgetAlertRuleList"];
                };
            };
        };
    };
    PublicAdsReportingController_createRule: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateBudgetAlertRuleDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdBudgetAlertRule"];
                };
            };
        };
    };
    PublicAdsReportingController_removeRule: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                ruleId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdOk"];
                };
            };
        };
    };
    PublicAdsReportingController_updateRule: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                ruleId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateBudgetAlertRuleDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdBudgetAlertRule"];
                };
            };
        };
    };
    PublicAdsReportingController_alertHistory: {
        parameters: {
            query?: {
                rule_id?: string;
                limit?: number;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdBudgetAlertList"];
                };
            };
        };
    };
    SdkAdsController_attribution: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkAttributionDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkAttributionAccepted"];
                };
            };
        };
    };
    McpDraftsController_createCampaignDraft: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    /** @enum {string} */
                    type?: "one_time" | "scheduled" | "recurring";
                    audience?: {
                        all?: boolean;
                        segments?: string[];
                        exclude_segments?: string[];
                        /** @description Filtre AST: all/any/none grupları ve { field, op, value } koşulları (docs/plan/05 §5.7). */
                        filters?: {
                            all?: Record<string, never>[];
                            any?: Record<string, never>[];
                            none?: Record<string, never>[];
                        };
                        channels?: ("ios_push" | "android_push" | "hms_push" | "web_push" | "email" | "sms" | "whatsapp" | "rcs")[];
                        test_devices_only?: boolean;
                    };
                    /** @description messages.content ile aynı şema (headings, contents, url, buttons…) */
                    content?: Record<string, never>;
                    labels?: string[];
                    /** @description Tercih kategorisi anahtarı; kapalı kullanıcılar bastırılır */
                    category?: string | null;
                    ab_test?: {
                        enabled?: boolean;
                        test_percentage?: number;
                        winner?: {
                            /** @enum {string} */
                            mode?: "manual" | "auto";
                            /** @enum {string} */
                            metric?: "open_rate" | "click_rate" | "conversion_rate";
                            evaluate_after_minutes?: number;
                        };
                    };
                    /** @description A/B varyantları (ağırlıklar toplamı 100; en fazla bir is_control) */
                    variants?: {
                        id?: string;
                        name: string;
                        weight_percent: number;
                        content?: Record<string, never> | null;
                        is_control?: boolean;
                    }[];
                    template_id?: string;
                    template_version?: number;
                    delivery?: {
                        /** @enum {string} */
                        timezone_mode?: "immediate" | "per_user_timezone" | "optimized";
                        delivery_time_of_day?: string;
                        throttle_per_minute?: number;
                        ttl?: number;
                        /** @enum {integer} */
                        priority?: 5 | 10;
                        collapse_id?: string;
                        frequency_cap_exempt?: boolean;
                        quiet_hours_exempt?: boolean;
                        one_per_user?: boolean;
                    };
                    recurrence?: {
                        cron?: string;
                        /** Format: date-time */
                        until?: string | null;
                        timezone?: string;
                    } | null;
                    /** Format: date-time */
                    send_at?: string | null;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Campaign"];
                };
            };
        };
    };
    McpDraftsController_createSegmentDraft: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name: string;
                    description?: string | null;
                    /** @description Filtre AST: all/any/none grupları ve { field, op, value } koşulları (docs/plan/05 §5.7). */
                    definition: {
                        all?: Record<string, never>[];
                        any?: Record<string, never>[];
                        none?: Record<string, never>[];
                    };
                    is_dynamic?: boolean;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Segment"];
                };
            };
        };
    };
    SdkGrowthController_list: {
        parameters: {
            query?: {
                subscription_id?: string;
                token_hash?: string;
                language?: string;
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SdkWebCampaignList"];
                };
            };
        };
    };
    SdkGrowthController_event: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                campaignId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkWebCampaignEventDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Ok"];
                };
            };
        };
    };
    SdkGrowthController_submit: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                formId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkFormSubmitDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FormSubmitResult"];
                };
            };
        };
    };
    SdkGrowthController_respond: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
                surveyId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SdkSurveyResponseDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SurveyResponseResult"];
                };
            };
        };
    };
    PublicWebCampaignsController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                status?: "draft" | "active" | "paused" | "archived";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebCampaignPage"];
                };
            };
        };
    };
    PublicWebCampaignsController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateWebCampaignDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebCampaign"];
                };
            };
        };
    };
    PublicWebCampaignsController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebCampaign"];
                };
            };
        };
    };
    PublicWebCampaignsController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateWebCampaignDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebCampaign"];
                };
            };
        };
    };
    PublicWebCampaignsController_report: {
        parameters: {
            query?: {
                days?: number;
            };
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebCampaignReport"];
                };
            };
        };
    };
    PublicWebCampaignsController_status: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                campaignId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["WebCampaignStatusDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebCampaign"];
                };
            };
        };
    };
    PublicFormsController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                status?: "active" | "archived";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FormPage"];
                };
            };
        };
    };
    PublicFormsController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateFormDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Form"];
                };
            };
        };
    };
    PublicFormsController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                formId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Form"];
                };
            };
        };
    };
    PublicFormsController_submissions: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                status?: "accepted" | "pending_confirmation" | "confirmed";
                since?: string;
            };
            header?: never;
            path: {
                formId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FormSubmissionPage"];
                };
            };
        };
    };
    PublicFormsController_submit: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                formId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PublicFormSubmitDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FormSubmitResult"];
                };
            };
        };
    };
    PublicSurveysController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                status?: "draft" | "active" | "closed";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SurveyPage"];
                };
            };
        };
    };
    PublicSurveysController_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateSurveyDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Survey"];
                };
            };
        };
    };
    PublicSurveysController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                surveyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Survey"];
                };
            };
        };
    };
    PublicSurveysController_status: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                surveyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SurveyStatusDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Survey"];
                };
            };
        };
    };
    PublicSurveysController_report: {
        parameters: {
            query?: {
                days?: number;
            };
            header?: never;
            path: {
                surveyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SurveyReport"];
                };
            };
        };
    };
    PublicSurveysController_responses: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                text_question?: string;
                nps_category?: "promoter" | "passive" | "detractor";
            };
            header?: never;
            path: {
                surveyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SurveyResponsePage"];
                };
            };
        };
    };
    PublicSurveysController_respond: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                surveyId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PublicSurveyResponseDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SurveyResponseResult"];
                };
            };
        };
    };
    PublicLandingPagesController_list: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string;
                status?: "draft" | "published" | "archived";
            };
            header?: never;
            path: {
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LandingPageList"];
                };
            };
        };
    };
    PublicLandingPagesController_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                pageId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LandingPage"];
                };
            };
        };
    };
    PublicLandingPagesController_publish: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                pageId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LandingPage"];
                };
            };
        };
    };
    PublicLandingPagesController_unpublish: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                pageId: string;
                appId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    "X-RateLimit-Limit": components["headers"]["X-RateLimit-Limit"];
                    "X-RateLimit-Remaining": components["headers"]["X-RateLimit-Remaining"];
                    "X-RateLimit-Reset": components["headers"]["X-RateLimit-Reset"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LandingPage"];
                };
            };
        };
    };
}
