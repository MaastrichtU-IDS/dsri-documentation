class Comment < ApplicationRecord
  include TenantOwnable
  
  belongs_to :user
  belongs_to :post
  belongs_to :parent, class_name: 'Comment', optional: true
  has_many :children, class_name: 'Comment', foreign_key: 'parent_id', dependent: :destroy

  validates :body, presence: true
end
