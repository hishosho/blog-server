exports.privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCx3vJpMj7Gdceb3O28+mxzIOugN1lQH4P9QRe3WkVSuKO6v0Gc
XDbFtlgico2wH2QJ9YXddgHQTOZlUCFSTCnRkrnGIO3xolB12a3pzY6oDqyJZmex
+wtQDWs4BaoEVtz8f1cJptFGzWlVk8LS5uuPyFH2R1osaCVIgmV83K66FwIDAQAB
AoGAQ2lhqijWzdR5kELM/2BRldiWNKSFfu5S0brHyD+4Ij/EHdS6gw4X3BrdkECm
HmfnPDcHQwWkblOWxjL2TgB7oEYghLMwHoMymLuUc6Rp2ar2DLl3Y65QRvzW2sd/
Xt11qEzDWIbym7gIrNsePlnWom3r22xQODwN0PrHG3F4bkECQQDXO4nNrNm8nY7m
uXnHa9hnBvxnK+YhxowAGFS8GB0a6r7ZLQf+1Lse3LlUOTcRdmNna3g1avxFgVjI
e5XIzwwRAkEA04/E7zVI7GMGdyMye8hrdutKLDtaAMPArjbgv4983AvoPiGKpqfR
JJlhr+lSsi1/R9TQEbDOQl04oVytQCcrpwJBAMety+YNw5+SSR5S2uEhc4351Dbf
akzRh9cau5oZgP8U4+RWO8G2mLdELYgu4KEJxaUP9mEQlWTiYHz28vpu5BECQE/M
muvfnXIMqBOoIxKttltUxNWKTZicPcF40a1v4hjeJOvKmxHhmvHDKSXBTIAIyUm+
6/zARAykPQggfPkFzWECQEb9uTPccpe9M25WYTICV1u6rvryUyvNkNNqdZ2Hcssx
lw6NprBTNsxr8QNWhkbhlr09ivsUTCsUGo8PF8IN4n8=
-----END RSA PRIVATE KEY-----`

exports.TOKEN_EXPIRE_TIME = 24 * 60 * 60

exports.whitePaths = [
  '/users/login',
  '/users/register',
  '/blogs/publishedBlogs',
  '/blogs/popular',
  '/tags',
  '/blogs/blogDetail',
  '/blogs/getBlogsByTagId'
]