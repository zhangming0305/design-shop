'use strict';

exports.shop = function* () {
    
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;
/*
  const result = yield {
    articles: this.service.article.list(pageNum, pageSize),
    count: this.service.article.count(),
    site: this.service.site.getSite(),
  };
*/
    const result = {};
    yield this.render('shop.html', Object.assign({
        pageNum,
        pageSize,
    }, result));

};


exports.home = function* () {
    const result = {};
    yield this.render('home.html', result);
};

exports.about = function* () {
    const result = {};
    yield this.render('about.html', result);
};

exports.contact = function* () {
    const result = {};
    yield this.render('contact.html', result);
};

exports.upload = function* () {
  const stream = yield this.getFileStream();
  const object = yield this.oss.put(moment(Date.now()).format('YYYY-MM-DD') + '/' + stream.filename, stream);
  if (object) {
    this.body = {
      success: 1,           // 0 表示上传失败，1 表示上传成功
      message: '上传成功',
      url: object.url,        // 上传成功时才返回
    };
  } else {
    this.body = {
      success: 0,           // 0 表示上传失败，1 表示上传成功
      message: '上传失败',
    };
  }

};