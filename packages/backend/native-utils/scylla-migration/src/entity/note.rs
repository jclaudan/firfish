//! `SeaORM` Entity. Generated by sea-orm-codegen 0.12.2

use super::sea_orm_active_enums::NoteVisibilityEnum;
use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq)]
#[sea_orm(table_name = "note")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: String,
    #[sea_orm(column_name = "createdAt")]
    pub created_at: DateTimeWithTimeZone,
    #[sea_orm(column_name = "replyId")]
    pub reply_id: Option<String>,
    #[sea_orm(column_name = "renoteId")]
    pub renote_id: Option<String>,
    #[sea_orm(column_type = "Text", nullable)]
    pub text: Option<String>,
    pub name: Option<String>,
    pub cw: Option<String>,
    #[sea_orm(column_name = "userId")]
    pub user_id: String,
    #[sea_orm(column_name = "localOnly")]
    pub local_only: bool,
    #[sea_orm(column_name = "renoteCount")]
    pub renote_count: i16,
    #[sea_orm(column_name = "repliesCount")]
    pub replies_count: i16,
    #[sea_orm(column_type = "JsonBinary")]
    pub reactions: Json,
    pub visibility: NoteVisibilityEnum,
    pub uri: Option<String>,
    pub score: i32,
    #[sea_orm(column_name = "fileIds")]
    pub file_ids: Vec<String>,
    #[sea_orm(column_name = "attachedFileTypes")]
    pub attached_file_types: Vec<String>,
    #[sea_orm(column_name = "visibleUserIds")]
    pub visible_user_ids: Vec<String>,
    pub mentions: Vec<String>,
    #[sea_orm(column_name = "mentionedRemoteUsers", column_type = "Text")]
    pub mentioned_remote_users: String,
    pub emojis: Vec<String>,
    pub tags: Vec<String>,
    #[sea_orm(column_name = "hasPoll")]
    pub has_poll: bool,
    #[sea_orm(column_name = "userHost")]
    pub user_host: Option<String>,
    #[sea_orm(column_name = "replyUserId")]
    pub reply_user_id: Option<String>,
    #[sea_orm(column_name = "replyUserHost")]
    pub reply_user_host: Option<String>,
    #[sea_orm(column_name = "renoteUserId")]
    pub renote_user_id: Option<String>,
    #[sea_orm(column_name = "renoteUserHost")]
    pub renote_user_host: Option<String>,
    pub url: Option<String>,
    #[sea_orm(column_name = "channelId")]
    pub channel_id: Option<String>,
    #[sea_orm(column_name = "threadId")]
    pub thread_id: Option<String>,
    #[sea_orm(column_name = "updatedAt")]
    pub updated_at: Option<DateTimeWithTimeZone>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
