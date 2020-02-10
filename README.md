# chatspace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index|
|email|string|null: false, unique:true|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|references|null:false|
|user_id|refereces|null:false|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|integer|null: false|
### Association
- has_many :messages
- has_many :users_groups
- has_many :users, through: :users_groups

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false|
|group_id|references|null: false|
### Association
- belongs_to :user
- belongs_to :group