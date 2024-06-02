import { Router } from 'express';
import BoardController from '../controllers/board.controller';
import { asyncHandler } from '../utils/request-handler.util';

const router = Router();

const boardController = new BoardController();

router
  .route('/post')
  .post(asyncHandler(boardController.write))
  .get(asyncHandler(boardController.postApiHandler))
  .delete(asyncHandler(boardController.deletePost));

router
  .route('/comment')
  .post(asyncHandler(boardController.comment));

router
  .route('/like')
  .post(asyncHandler(boardController.like));
export default router;