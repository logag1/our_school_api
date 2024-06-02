import { Request, Response } from 'express';
import { Post } from '../models/board.interface';
import { getRandomId } from '../utils/random.util';
import Logger from '../utils/logger.util';

export default class BoardController {
  private _logger;

  constructor(
  ) {
    this._logger = new Logger('BOARD_CONTROLLER');
  }

  public async write(req: Request, res: Response) {
    console.log(req.body);

    const postId = getRandomId();

    if (req.body.title.trim() == '' || req.body.content.trim() == '')
      return res.status(500).json({ success: false, message: '내용을 입력해주세요' });

    if (req.body.title.length > 30)
      return res.status(500).json({ success: false, message: '제목은 30글자 이하로 입력해주세요' });

    await Post.create({
      title: req.body.title,
      content: req.body.content,
      nickname: req.body.nickname,
      like: 0,
      postId,
      comments: []
    });

    return res.status(200).json({ success: true, postId });
  }

  public async comment(req: Request, res: Response) {
    console.log(req.body);

    if (req.body.content.length > 200)
      return res.status(500).json({ success: false, message: '글자수는 200자 미만으로 작성해주세요' });

    if (req.body.nickname.trim() == '' || req.body.content.trim() == '')
      return res.status(500).json({ success: false, message: '내용을 입력해주세요' });

    const post = await Post.findOne({ postId: req.body.postId });

    if (!post) {
      return res.status(500).json({ success: false, message: '존재하지 않는 게시물' });
    }

    const commentId = getRandomId();

    post.comments.push({
      nickname: req.body.nickname,
      content: req.body.content,
      commentId,
      like: 0
    });

    await post.save();

    return res.status(200).json({ success: true, commentId });
  }

  private async _getPostContent(req: Request, res: Response) {
    const postId = req.query.postId;

    console.log(postId as string);

    const post = await Post.findOne({ postId });

    if (!post) {
      return res.status(500).json({ success: false, message: '존재하지 않는 게시물' });
    }

    post.comments.reverse();

    return res.status(200).json({
      success: true,
      result: post
    });
  }

  private async _getAllPosts(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      result: (await Post.find()).reverse()
    });
  }

  public async deletePost(req: Request, res: Response) {
    // USER VERIFY...

    const post = await Post.findOneAndDelete({ postId: req.query.postId });

    if (!post)
      return res.status(500).json({ success: false, message: '존재하지 않는 게시물' });

    return res.status(200).json({ success: true });
  }

  public postApiHandler = (req: Request, res: Response) => {
    if (req.query.postId) {
      this._getPostContent(req, res);
    } else {
      this._getAllPosts(req, res);
    }
  }

  public async like(req: Request, res: Response) {
    const post = await Post.findOne({ postId: req.body.postId });

    if (!post)
      return res.status(500).json({ success: false, message: '존재하지 않는 게시물' });

    post.like++;

    await post.save();

    return res.status(200).json({ success: true, like: post.like });
  }
}