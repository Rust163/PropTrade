
    class INSTRUMENTS {
        #4CAF50
        int id PK "🔑 Тикер (SecId)"
        varchar(50) sec_id UK
        varchar(100) short_name "📛 Краткое название"
        varchar(200) sec_name "🏷️ Полное название"
        enum instrument_type "💱 Тип (stock/futures/currency)"
        -- Дополнительные поля --
        varchar(200) lat_name "🌍 Международное название"
        varchar(10) currency_id "💰 Валюта"
        decimal(20,6) prev_price "📉 Цена закрытия"
        int lot_size "📦 Размер лота"
    }

    class TRADES {
        #2196F3
        bigint id PK "🔑 ID сделки"
        int trade_id "🆔 Номер сделки"
        enum direction "🔼🔽 Buy/Sell"
        decimal(20,6) price "💲 Цена"
        -- Связи --
        varchar(20) instrument_sec_id FK "→ INSTRUMENTS.sec_id"
        -- Дополнительные поля --
        datetime trade_time "🕒 Время сделки"
        enum status "🟡 Статус (Pending/Executed)"
    }

    class MARKET_DATA {
        #FFC107
        int instrument_id PK,FK "🔑 → INSTRUMENTS.id"
        decimal(20,6) last_price "💹 Последняя цена"
        decimal(20,6) high_price "📈 Максимум"
        decimal(20,6) low_price "📉 Минимум"
        decimal(20,2) volume "📊 Объем"
    }

    %% Специфичные таблицы
    class STOCK_SPECIFICS {
        #9C27B0
        int instrument_id PK,FK "🔑 → INSTRUMENTS.id"
        varchar(12) isin "🆔 ISIN код"
        varchar(10) board_id "🏛️ Режим торгов"
        int list_level "⭐ Уровень листинга"
    }

    class FUTURES_SPECIFICS {
        #3F51B5
        int instrument_id PK,FK "🔑 → INSTRUMENTS.id"
        date expiration_date "⏳ Дата экспирации"
        decimal(20,6) initial_margin "🛡️ ГО"
    }

    class CURRENCY_SPECIFICS {
        #00BCD4
        int instrument_id PK,FK "🔑 → INSTRUMENTS.id"
        varchar(10) base_currency "💵 Базовая валюта"
        varchar(10) quote_currency "💶 Котируемая валюта"
    }

    class FAVORITES {
        #E91E63
        int id PK "🔑 ID избранного"
        int user_id FK "👤 → USERS.id"
        int instrument_id FK "💱 → INSTRUMENTS.id"
        timestamp added_at "📅 Дата добавления"
    }

    %% Связи между таблицами
    INSTRUMENTS ||--o{ TRADES : "1:N\n(инструмент → сделки)"
    INSTRUMENTS ||--|{ MARKET_DATA : "1:1\n(текущие данные)"
    INSTRUMENTS ||--o{ STOCK_SPECIFICS : "1:0..1\n(акции)"
    INSTRUMENTS ||--o{ FUTURES_SPECIFICS : "1:0..1\n(фьючерсы)"
    INSTRUMENTS ||--o{ CURRENCY_SPECIFICS : "1:0..1\n(валюта)"
    INSTRUMENTS }|--|{ FAVORITES : "M:N\n(избранное)"