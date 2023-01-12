import fs from 'node:fs';
import path from 'node:path';

const contentPath = path.join(process.cwd(), 'content', 'blog');

// get markdown files from content folder and return only the five most recent
const posts = fs.readdirSync(contentPath)
    .sort((a, b) => {
        //get the birth time of each file and sort
        const aTime = fs.statSync(contentPath + '/' + a).birthtime;
        const bTime = fs.statSync(contentPath + '/' + b).birthtime;
        return bTime - aTime;
    })
    .slice(0, 5)
    .map((fileName) => {
        //get the file contents
        console.log(fileName);
        const file = fs.readFileSync(contentPath + '/' + fileName, 'utf8');

        //get the title, subtitle, author, and date from the file
        const title = file.match(/(?<=title: ).*/)[0].replace(/'/g, '');
        const subtitle = file.match(/(?<=subtitle: ).*/)[0].replace(/'/g, '');
        const author = file.match(/(?<=author: ).*/)[0].replace(/'/g, '');
        const date = file.match(/(?<=date: ).*/)[0].replace(/'/g, '');

        return { title, subtitle, author, date };
    });

const preview = (post) => {
    const { title, subtitle, author, date } = post;
    return (
        <li class="w-full">
            <button class="flex flex-col hover:bg-gray-100 w-full p-2">
                <h6>{title}</h6>
                <span class="block info-light text-[16px] mb-1">{subtitle}</span>
                <div class="flex items-center info-light font-semibold uppercase">
                    <span class="text-xs">{author}</span>
                    <span class="text-xs mx-2">{date}</span>
                </div>
            </button>
        </li>
    );
};

export default function RecentPosts(props) {
    return (
        <ul class="w-full flex flex-col">
            {posts.map(post => preview(post))}
        </ul>
    );
}