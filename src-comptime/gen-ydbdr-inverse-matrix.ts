import Matrix, {inverse} from "ml-matrix";

const inv = inverse(Matrix.from1DArray(
    3,
    3,
    [
        0.299, 0.587, 0.114,
        -0.450, -0.883, 1.333,
        -1.333, 1.116, 0.217,
    ],
));

console.log(inv.to1DArray());