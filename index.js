const btns = document.getElementsByTagName("button");

let calcString = ""

function convertToPostfix(infix) {
    var output = "";
    var stack = [];
    for (var i = 0; i < infix.length; i++) {
        var ch = infix.charAt(i);
        if (ch == '+' || ch == '-' || ch == '*' || ch == '/') {
            while (stack.length != 0 && stack[stack.length - 1] != '(' &&
                getPrecedence(ch) <= getPrecedence(stack[stack.length - 1])) {
                output += stack.pop();
                output += ' ';
            }
            stack.push(ch);
        }
        else if (ch == '(') {
            stack.push(ch);
        }
        else if (ch == ')') {
            while (stack.length != 0 && stack[stack.length - 1] != '(') {
                output += stackHTML.pop();
                output += ' ';
            }
            stack.pop();
        } else {
            output += ch;
        }
    }
    while (stack.length != 0) {
        output += stack.pop();
        output += ' ';
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
    // console.log(postfixArray)
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
    //    console.log(`Final length of stack is: ${stack.length}`)
    //    console.log(`The stack is:${stack}`);
    if (isNaN(stack[0])) {
        return "Syntax Error"
    }
    else {
        return stack[0];
    }
}
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (event) {
        if (event.target.name !== "AC" && event.target.name !== "=") {
            calcString += event.target.value;
            console.log(calcString);
            document.getElementsByTagName("span")[0].innerText = calcString
        }
        else if (event.target.name === "AC") {
            calcString = ""
            document.getElementsByTagName("span")[0].innerText = calcString
        }
        else {
            let postfixArray = convertToPostfix(calcString).split("").filter(char => char !== " ");
            console.log(postfixArray);

            let ans = postfixEval(postfixArray);
            calcString = ans;
            document.getElementsByTagName("span")[0].innerText = calcString

        }
    })
}


