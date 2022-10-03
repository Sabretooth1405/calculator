const btns = document.getElementsByTagName("button");

let calcString = ""

function convertToPostfix(infix) {
    var output = [];
    var stack = [];
    for (var i = 0; i < infix.length; i++) {
        var ch = infix[i];
        if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
            while (stack.length != 0 && stack[stack.length - 1] != '(' &&
                getPrecedence(ch) <= getPrecedence(stack[stack.length - 1])) {
                output.push(stack.pop());

            }
            stack.push(ch);
        }
        else if (ch == '(') {
            stack.push(ch);
        }
        else if (ch == ')') {
            while (stack.length != 0 && stack[stack.length - 1] != '(') {
                output.push(stackHTML.pop());

            }
            stack.pop();
        } else {
            output.push(ch);
        }
    }
    while (stack.length != 0) {
        output.push(stack.pop());

    }
    return output;
}
function getPrecedence(ch) {
    if (ch == '+' || ch == '-') {
        return 1;
    }
    else if (ch == '*' || ch == '/') {
        return 2;
    } else {
        return 0;
    }
}
function postfixEval(postfixArray) {
    var stack = [];

    for (element of postfixArray) {


        if (isNaN(element)) {
            var x = stack.pop();
            var y = stack.pop();
            if (element == "+") {

                stack.push(y + x);
            } else if (element == '-') {

                stack.push(y - x);
            } else if (element == '*') {

                stack.push(y * x);
            } else if (element == '/') {

                stack.push(y / x);
            }
        } else {
            stack.push(parseFloat(element));
        }
    }
    if (isNaN(stack[0])) {
        return "Syntax Error"
    }
    else {
        return stack[0];
    }
}
//Function which breaks an infix expression into it induvivual elements eg. 7.2*23-8 into ['7.2','*','23','-','8']
function alternateParse(expression) {

    let copy = expression;

    expression = expression.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
    let numbers = copy.split(/[^0-9\.]+/);
    let operators = expression.split("#").filter(function (n) { return n });
    let result = [];

    for (i = 0; i < numbers.length; i++) {
        result.push(numbers[i]);
        if (i < operators.length) result.push(operators[i]);
    }
    return result
}
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (event) {
        if (event.target.name !== "AC" && event.target.name !== "=") {
            calcString += event.target.value;
            document.getElementsByTagName("span")[0].innerText = calcString
        }
        else if (event.target.name === "AC") {
            calcString = ""
            document.getElementsByTagName("span")[0].innerText = calcString
        }
        else {
            console.log(alternateParse(calcString));
            let ans = postfixEval(convertToPostfix(alternateParse(calcString)));
            ans = Number.isInteger(ans) ? ans : Number.parseFloat(ans).toFixed(4);
            calcString = ans;
            document.getElementsByTagName("span")[0].innerText = calcString

        }
    })
}


