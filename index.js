// index.js
const express = require('express');
const { parseStringPromise } = require('xml2js');

const app = express();

// 接收原始 XML 数据
app.use(express.raw({ type: 'application/xml' }));

// 处理企业微信验证（GET）
app.get('/', (req, res) => {
  const { echostr } = req.query;
  if (echostr) {
    return res.status(200).send(echostr);
  }
  res.status(200).send('success');
});

// 处理消息接收（POST）
app.post('/', async (req, res) => {
  try {
    const xml = req.body.toString();
    const result = await parseStringPromise(xml);
    const msg = result.xml;

    console.log('【收到企业微信消息】', msg.Content?.[0]);

    res.status(200).send('success');
  } catch (err) {
    console.error('解析失败:', err.message);
    res.status(500).send('error');
  }
});

module.exports = app;
